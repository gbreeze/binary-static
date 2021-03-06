const SelectMatcher    = require('@binary-com/binary-style').select2Matcher;
const Cookies          = require('js-cookie');
const Client           = require('../../../base/client');
const BinarySocket     = require('../../../base/socket');
const FormManager      = require('../../../common/form_manager');
const TrafficSource    = require('../../../common/traffic_source');
const makeOption       = require('../../../../_common/common_functions').makeOption;
const localize         = require('../../../../_common/localize').localize;
const LocalStore       = require('../../../../_common/storage').LocalStore;
const State            = require('../../../../_common/storage').State;
const urlFor           = require('../../../../_common/url').urlFor;
const getPropertyValue = require('../../../../_common/utility').getPropertyValue;
const isEmptyObject    = require('../../../../_common/utility').isEmptyObject;

const VirtualAccOpening = (() => {
    const form = '#virtual-form';

    const onLoad = () => {
        if (Client.isJPClient()) {
            return;
        }

        BinarySocket.send({ residence_list: 1 }).then(response => handleResidenceList(response.residence_list));

        bindValidation();
        FormManager.handleSubmit({
            form_selector       : form,
            fnc_response_handler: handleNewAccount,
        });
    };

    const handleResidenceList = (residence_list) => {
        const $residence = $('#residence');
        if (residence_list.length > 0) {
            const $options_with_disabled = $('<div/>');
            residence_list.forEach((res) => {
                $options_with_disabled.append(makeOption({
                    text       : res.text,
                    value      : res.value,
                    is_disabled: res.disabled,
                }));
            });
            $residence.html($options_with_disabled.html());

            BinarySocket.wait('website_status').then(response => handleWebsiteStatus(response.website_status, $residence));
        } else {
            $residence.setVisibility(1);
        }
    };

    const handleWebsiteStatus = (website_status = {}, $residence) => {
        if (!website_status || isEmptyObject(website_status)) return;
        const clients_country = website_status.clients_country;

        // set residence value to client's country, detected by IP address from API
        const $clients_country = $residence.find(`option[value="${clients_country}"]`);
        if (!$clients_country.attr('disabled')) {
            $clients_country.prop('selected', true);
        }
        $residence
            .select2({
                matcher(params, data) {
                    return SelectMatcher(params, data);
                },
            })
            .setVisibility(1);
    };

    const bindValidation = () => {
        // Add TrafficSource parameters
        const utm_data = TrafficSource.getData();

        const req = [
            { selector: '#client_password', validations: ['req', 'password'], re_check_field: '#repeat_password' },
            { selector: '#repeat_password', validations: ['req', ['compare', { to: '#client_password' }]], exclude_request: 1 },

            { selector: '#residence' },
            { selector: '#email_consent' },
            { request_field: 'utm_source',          value: TrafficSource.getSource(utm_data) },
            { request_field: 'new_account_virtual', value: 1 },
        ];

        if (utm_data.utm_medium)   req.push({ request_field: 'utm_medium',   value: utm_data.utm_medium });
        if (utm_data.utm_campaign) req.push({ request_field: 'utm_campaign', value: utm_data.utm_campaign });

        const gclid = LocalStore.get('gclid');
        if (gclid) req.push({ request_field: 'gclid_url', value: gclid });

        if (Cookies.get('affiliate_tracking')) req.push({ request_field: 'affiliate_token', value: Cookies.getJSON('affiliate_tracking').t });

        FormManager.init(form, req, true);
    };

    const handleNewAccount = (response) => {
        if (!response) return false;
        const error = response.error;
        if (!error) {
            const new_account = response.new_account_virtual;
            const residence   = response.echo_req.residence;
            Client.set('residence', residence, new_account.client_id);
            LocalStore.remove('gclid');
            State.set('skip_response', 'authorize');
            BinarySocket.send({ authorize: new_account.oauth_token }, { forced: true }).then((response_auth) => {
                if (!response_auth.error) {
                    Client.processNewAccount({
                        email       : new_account.email,
                        loginid     : new_account.client_id,
                        token       : new_account.oauth_token,
                        is_virtual  : true,
                        redirect_url: urlFor('new_account/welcome'),
                    });
                }
            });
            return true;
        }

        const showInvalidTokenMessage = () => {
            const message = 'Your token has expired or is invalid. Please click <a href="[_1]">here</a> to restart the verification process.';
            return showFormError(message, '');
        };

        switch (error.code) {
            case 'InputValidationFailed': {
                return getPropertyValue(response, ['error', 'details', 'verification_code']) ? showInvalidTokenMessage() : showError(error.message);
            }
            case 'InvalidToken': {
                return showInvalidTokenMessage();
            }
            case 'duplicate email': {
                const message = 'The email address provided is already in use. If you forgot your password, please try our <a href="[_1]">password recovery tool</a> or contact our customer service.';
                return showFormError(message, 'user/lost_passwordws');
            }
            case 'PasswordError': {
                return showError('Password is not strong enough.');
            }
            default: {
                return showError(error.message);
            }
        }
    };

    const showFormError = (message, url) => {
        $('#virtual-form').html($('<p/>', { html: localize(message, [urlFor(url)]) }));
    };

    const showError = (message) => {
        $('#error-account-opening').setVisibility(1).text(localize(message));
    };

    return {
        onLoad,
    };
})();

module.exports = VirtualAccOpening;
