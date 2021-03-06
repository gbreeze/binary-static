import React from 'react';
import Loading from '../../_common/components/loading.jsx';
import { FormRow, SubmitButton } from '../../_common/components/forms.jsx';
import SeparatorLine from '../../_common/components/separator_line.jsx';

const AccountDesc = ({ title, description, account_type, items }) => {
    let types = '';
    if (account_type) {
        account_type.forEach((type) => {
            types += ` demo_${type} real_${type}`;
        });
    } else {
        types = 'new_account new_account_mam';
    }

    return (
        <div className={types}>
            <h3>{title}</h3>
            <p>{description}</p>
            <ul className='checked small no-padding'>
                { items && items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
            <p>
                <a className='hl-types-of-accounts' href={it.url_for('metatrader/types-of-accounts')} target='_blank'>{it.L('Compare MetaTrader 5 accounts')}</a>
            </p>
        </div>
    );
};

const TypeGroup = ({ title, children, types }) => (
    <div className='type-group gr-row'>
        <div className='gr-12 gr-padding-20 gr-parent'>
            <h3>{title}</h3>
            {children}
        </div>
        { types.map((box, i) => (
            <div key={i} className={box.title ? 'gr-6' : 'gr-3 gr-6-p gr-6-m gr-centered'}>
                <div id={box.id || `rbtn_${box.type}`} className='mt5_type_box' data-acc-type={box.type}>
                    {box.title ?
                        <div>{box.title}</div>
                        :
                        <img src={it.url_for(`images/pages/metatrader/icons/acc_${box.desc.toLowerCase()}.svg`)} />
                    }
                </div>
                <p className={`gr-padding-10 ${box.title ? 'hint' : ''}`}>{box.desc}</p>
            </div>
        ))}
    </div>
);

const CashierDesc = ({ title, desc, arrow_direction }) => (
    <div className='center-text hint gr-padding-20 gr-parent'>
        <h3 className='secondary-color'>{title}</h3>
        <p>{desc}</p>
        <div className='vertical-center gr-padding-10'>
            <img src={it.url_for('images/pages/metatrader/dashboard/binary_wallet.svg')} />
            <img src={it.url_for(`images/pages/metatrader/dashboard/arrow_${arrow_direction}.svg`)} className='gr-gutter' />
            <img src={it.url_for('images/pages/metatrader/dashboard/mt5_wallet.svg')} />
        </div>
    </div>
);

const Metatrader = () => (
    <React.Fragment>
        <div className='container'>
            <div className='static_full'>
                <h1>{it.L('MetaTrader 5 dashboard')}</h1>
            </div>
            <p id='page_msg' className='notice-msg center-text invisible' />
            <div id='mt_loading'><Loading /></div>
            <div id='mt_account_management' className='gr-row invisible'>
                <div id='mt_left_panel' className='gr-9 gr-12-t gr-12-p gr-12-m gr-no-gutter gr-gutter-right gr-no-gutter-p gr-no-gutter-m'>
                    <div id='account_details' className='mt-panel mt-container'>
                        <div className='gr-row'>
                            <div className='gr-grow'>
                                <div className='gr-row'>
                                    <div className='gr-grow'>
                                        <div id='account_selector'>
                                            <h4 id='mt5_account' />
                                            <div id='accounts_list'>
                                                <div className='list' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='gr-grow'>
                                        <a className='button button-secondary act_new_account' href='javascript:;'>
                                            <span id='new_account_icon'>{it.L('New Account')}</span>
                                        </a>
                                    </div>
                                </div>
                                <div className='acc-info has-account invisible'>
                                    <div className='gr-row gr-padding-10'>
                                        <div className='gr-3'>{it.L('MT5 Account:')}</div>
                                        <div className='gr-grow' data='login' />
                                    </div>
                                    <div className='gr-row'>
                                        <div className='gr-3'>{it.L('Name:')}</div>
                                        <div className='gr-grow' data='name' />
                                    </div>
                                    <div className='gr-row gr-padding-10 gr-hide mobile-balance'>
                                        <div className='gr-3'>{it.L('Balance:')}</div>
                                        <div className='gr-gutter' data='balance' />
                                    </div>
                                </div>
                            </div>
                            <div className='gr-adapt align-end gr-hide-m gr-hide-p'>
                                <div className='acc-info has-account invisible'>
                                    <div>{it.L('Balance')}</div>
                                    <div className='balance gr-padding-10' data='balance' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-panel'>
                        <div className='acc-actions'>
                            <a href='javascript:;' className='act_new_account new-account center-text invisible'>
                                <span>{it.L('Create MetaTrader 5 account')}</span>
                            </a>
                            {/* toEnableMAM: add 'new-account' to className */}
                            <a href='javascript:;' className='act_new_account_mam center-text invisible'>
                                <span>{it.L('Create MAM account')}</span>
                            </a>
                            <a href='javascript:;' className='act_cashier has-account center-text invisible'>
                                <span>{it.L('Manage funds')}</span>
                            </a>
                            <a href='javascript:;' className='act_manage_password has-account center-text invisible'>
                                <span>{it.L('Manage MT5 password')}</span>
                            </a>
                            <a href='javascript:;' className='act_revoke_mam has-mam center-text invisible'>
                                <span>{it.L('Manage MAM account')}</span>
                            </a>
                        </div>
                        <div className='fst-container mt-container'>
                            <div id='fst_action' className='invisible'>
                                <p id='main_msg' className='notice-msg center-text invisible' />
                                <div id='frm_action' className='invisible' />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='mt_right_panel' className='gr-3 gr-12-t gr-12-p gr-12-m gr-no-gutter gr-gutter-left gr-no-gutter-p gr-no-gutter-m'>
                    <a href={`${it.url_for('get-started')}?get_started_tabs=mt5`} className='get-started-link'>{it.L('Get started with MT5')}</a>
                    <div className='mt-panel'>
                        <div id='account_desc' className='mt-container border-bottom' />
                        <div className='mt-container'>
                            <p>{it.L('MT5 trading platform links:')}</p>
                            <ul className='platforms'>
                                <li>
                                    <img src={it.url_for('images/pages/metatrader/dashboard/web.svg')} />
                                    <a href='https://trade.mql5.com/trade?servers=Binary.com-Server&amp;trade_server=Binary.com-Server' rel='noopener noreferrer' target='_blank'>{it.L('Trade on web platform')}</a>
                                </li>
                                <li>
                                    <img src={it.url_for('images/pages/metatrader/dashboard/mac.svg')} />
                                    <a href='https://s3.amazonaws.com/binary-mt5/binary-mt5.dmg' download>{it.L('Download for Mac')}</a>
                                </li>
                                <li>
                                    <img src={it.url_for('images/pages/metatrader/dashboard/linux.svg')} />
                                    <a href='https://www.metatrader5.com/en/terminal/help/start_advanced/install_linux' rel='noopener noreferrer' target='_blank'>{it.L('Instructions for Linux')}</a>
                                </li>
                                <li>
                                    <img src={it.url_for('images/pages/metatrader/dashboard/windows.svg')} />
                                    <a href='https://s3.amazonaws.com/binary-mt5/binarycom_mt5.exe' download>{it.L('Download for Windows')}</a>
                                </li>
                                <p className='badges'>
                                    <a href='https://download.mql5.com/cdn/mobile/mt5/ios?server=Binary.com-Server' rel='noopener noreferrer' target='_blank'>
                                        <span className='app-store-badge' />
                                    </a>
                                    <a href='https://download.mql5.com/cdn/mobile/mt5/android?server=Binary.com-Server' rel='noopener noreferrer' target='_blank'>
                                        <span className='google-play-badge' />
                                    </a>
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id='templates' className='invisible'>
                    <div className='acc-name invisible'>
                        <div className='mt-icon'>
                            <img src={it.url_for('images/pages/metatrader/dashboard/account.svg')} />
                        </div>
                        <div className='mt-balance invisible'>&nbsp;</div>
                        <span className='mt-type' />
                        <span className='mt-login' />
                    </div>


                    <div className='account-desc'>
                        <AccountDesc
                            title={it.L('Choose an account')}
                            description={it.L('[_1] offers a variety of account types to cater to the diverse needs of traders everywhere, whether you’re an experienced trader or just starting out.', it.website_name)}
                        />
                        <AccountDesc
                            account_type={['vanuatu_standard']}
                            title={it.L('Standard Account')}
                            description={it.L('Our MetaTrader 5 Standard account is suitable for both new and experienced traders.')}
                            items={[
                                it.L('Leverage up to [_1]', '1:1000'),
                                it.L('Variable spreads'),
                                it.L('Market execution'),
                                it.L('No commission'),
                            ]}
                        />
                        <AccountDesc
                            account_type={['vanuatu_advanced']}
                            title={it.L('Advanced Account')}
                            description={it.L('Our MetaTrader 5 Advanced account provides you with tight spreads, higher ticket size and offers more products.')}
                            items={[
                                it.L('Leverage up to [_1]', '1:300'),
                                it.L('Variable spreads'),
                                it.L('Market execution'),
                                it.L('No commission'),
                            ]}
                        />
                        <AccountDesc
                            account_type={['costarica', 'malta']}
                            title={it.L('Volatility Indices Account')}
                            description={it.L('Our Volatility Indices account allows you to trade CFDs on Volatility Indices -- our proprietary synthetic assets that simulate market forces.')}
                            items={[
                                it.L('Leverage up to [_1]', '1:500'),
                                it.L('Fixed spreads'),
                                it.L('Market execution'),
                                it.L('No commission'),
                            ]}
                        />
                        <AccountDesc
                            account_type={['vanuatu_mamm_advanced']}
                            title={it.L('MAM Advanced account')}
                            description={it.L('Our MAM Advanced account can be assigned to a money manager who will trade on your behalf with more competitive spreads than the regular Advanced account.')}
                            items={[
                                it.L('Leverage up to [_1]', '1:300'),
                                it.L('Over 70 available assets'),
                                it.L('Market execution'),
                            ]}
                        />
                        <AccountDesc
                            account_type={['costarica_mamm']}
                            title={it.L('MAM Volatility Indices Account')}
                            description={it.L('Our MAM Volatility Indices account can be assigned to a money manager who will trade on your behalf with the same specifications as the regular Volatility Indices account.')}
                            items={[
                                it.L('Leverage up to [_1]', '1:500'),
                                it.L('Fixed spreads'),
                                it.L('Market execution'),
                            ]}
                        />
                    </div>

                    <div id='frm_new_accounts'>
                        <form id='frm_new_account'>
                            <div id='mv_new_account'>
                                <div id='view_1' className='center-text'>
                                    <div className='step-1'>
                                        <TypeGroup
                                            title={it.L('Step 1: Choose demo or real account')}
                                            types={[
                                                { type: 'demo', id: 'rbtn_demo', title: it.L('Demo'), desc: it.L('Practise your trading strategy with [_1] of virtual funds in a risk-free environment.', '$10,000') },
                                                { type: 'real', id: 'rbtn_real', title: it.L('Real'), desc: it.L('Trade with real funds and access to competitive trading conditions.') },
                                            ]}
                                        />
                                    </div>
                                    <div className='step-2 invisible'>
                                        <div className='separator-line gr-padding-10' />
                                        <TypeGroup
                                            title={it.L('Step 2: Choose account type')}
                                            types={[
                                                { type: 'template', desc: 'standard' },
                                            ]}
                                        >
                                            <a className='hint hl-types-of-accounts' href={it.url_for('metatrader/types-of-accounts')} target='_blank'>{it.L('Which account is right for me?')}</a>
                                        </TypeGroup>
                                    </div>
                                    <p id='new_account_msg' className='notice-msg center-text invisible' />
                                    <div className='center-text'>
                                        <a id='btn_cancel' className='button button-secondary' href='javascript:;'>
                                            <span>{it.L('Cancel')}</span>
                                        </a>
                                        <a id='btn_next' className='button button-disabled' href='javascript:;'>
                                            <span>{it.L('Next')}</span>
                                        </a>
                                    </div>
                                </div>
                                <div id='view_2' className='gr-row invisible'>
                                    <div className='gr-8 gr-12-m'>
                                        <FormRow is_two_rows type='text'     id='txt_name'          label={it.L('Name')} attributes={{ maxLength: 30, autoComplete: 'off' }} />
                                        <FormRow is_two_rows type='password' id='txt_main_pass'     label={it.L('Main password (trading access)')} hint={it.L('Minimum eight characters. Must contain numbers, and mix of upper and lower case letters.')} />
                                        <FormRow is_two_rows type='password' id='txt_re_main_pass'  label={it.L('Verify main password')} />
                                        <FormRow is_two_rows type='password' id='txt_investor_pass' label={it.L('Investor password (read-only access)')} />
                                        <SubmitButton
                                            no_wrapper
                                            type='submit'
                                            id='btn_submit_new_account'
                                            text={it.L('Create Account')}
                                            attributes={{ action: 'new_account' }}
                                            custom_btn_text={it.L('Back')}
                                            custom_btn_id='btn_back'
                                            custom_btn_class='button-secondary'
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form id='frm_new_account_mam'>
                            <div id='mv_new_account'>
                                <div id='view_1' className='center-text'>
                                    <div className='step-2'>
                                        <TypeGroup
                                            types={[
                                                { type: 'template', desc: 'standard' },
                                            ]}
                                        />
                                    </div>
                                    <p id='new_account_msg' className='notice-msg center-text invisible' />
                                    <div className='center-text'>
                                        <a id='btn_cancel' className='button button-secondary' href='javascript:;'>
                                            <span>{it.L('Cancel')}</span>
                                        </a>
                                        <a id='btn_next' className='button button-disabled' href='javascript:;'>
                                            <span>{it.L('Next')}</span>
                                        </a>
                                    </div>
                                    <SeparatorLine className='gr-padding-30 margin-left-right-20' />
                                    <div className='center-text'>
                                        <h2>{it.L('What is a MAM account?')}</h2>
                                        <p>{it.L('A MAM account can be assigned to a money manager who will trade on your behalf. You can view all the trades executed by a money manager.')}</p>
                                        <div className='gr-padding-30 fill-bg-color margin-left-right-20'>
                                            <a href={it.url_for('multiple-accounts-manager')} target='_blank'>{it.L('Learn more about our Multiple Accounts Manager (MAM) facility for money managers')}</a>
                                        </div>
                                    </div>
                                </div>
                                <div id='view_2' className='gr-row invisible'>
                                    <div className='gr-8 gr-12-m'>
                                        <FormRow is_two_rows type='text'     id='txt_mam_name'          label={it.L('Name')} attributes={{ maxLength: 30, autoComplete: 'off' }} />
                                        <FormRow is_two_rows type='text'     id='txt_manager_id'        label={it.L('Manager ID')} tooltip={it.L('Login ID of money manager who will trade on your behalf')} attributes={{ maxLength: 15, autoComplete: 'off' }} />
                                        <FormRow is_two_rows type='password' id='txt_mam_main_pass'     label={it.L('Main password (trading access)')} hint={it.L('Minimum eight characters. Must contain numbers, and mix of upper and lower case letters.')} />
                                        <FormRow is_two_rows type='password' id='txt_mam_re_main_pass'  label={it.L('Verify main password')} />
                                        <FormRow is_two_rows type='password' id='txt_mam_investor_pass' label={it.L('Investor password (read-only access)')} />
                                        <FormRow type='checkbox' id='chk_tnc' label={it.L('I understand the risks involved and agree to the [_1]Terms & Conditions of the MAM facility[_2]', `<a href="${it.url_for('terms-and-conditions')}#mam" target="_blank">`, '</a>')} />
                                        <SubmitButton
                                            no_wrapper
                                            type='submit'
                                            id='btn_submit_new_account_mam'
                                            text={it.L('Create MAM Account')}
                                            attributes={{ action: 'new_account_mam' }}
                                            custom_btn_text={it.L('Back')}
                                            custom_btn_id='btn_back'
                                            custom_btn_class='button-secondary'
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id='frm_manage_password'>
                        <div className='gr-row'>
                            <div className='gr-6 gr-12-m flex'>
                                <div className='mt-panel mt-container'>
                                    <form id='frm_password_change'>
                                        <div className='center-text hint gr-padding-20 gr-parent'>
                                            <h3 className='secondary-color'>{it.L('Change password')}</h3>
                                        </div>

                                        <FormRow is_two_rows type='select' id='ddl_password_type' label={it.L('Password type')}>
                                            <option value='main'>{it.L('Main')}</option>
                                            <option value='investor'>{it.L('Investor')}</option>
                                        </FormRow>
                                        <FormRow is_two_rows type='password' id='txt_old_password'    label={it.L('Current MT5 password')} />
                                        <FormRow is_two_rows type='password' id='txt_new_password'    label={it.L('New MT5 password')} hint={it.L('Minimum eight characters. Must contain numbers, and mix of upper and lower case letters.')} />
                                        <FormRow is_two_rows type='password' id='txt_re_new_password' label={it.L('Verify new MT5 password')} />
                                        <SubmitButton
                                            no_wrapper
                                            type='submit'
                                            id='btn_submit_password_change'
                                            text={it.L('Change MT5 password')}
                                            attributes={{ action: 'password_change' }}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className='gr-6 gr-12-m flex'>
                                <div className='mt-panel mt-container'>
                                    <div className='center-text hint gr-padding-20 gr-parent'>
                                        <h3 className='secondary-color'>{it.L('Reset password')}</h3>
                                    </div>
                                    <form className='invisible' id='frm_verify_password_reset'>
                                        <div className='gr-padding-10'>
                                            <p className='center-text notice-msg no-margin invisible' id='token_error'>{it.L('Verification code is wrong. Please use the link sent to your email.')}</p>
                                            <p className='no-margin'>{it.L('To reset your trading or investor password, please click the button below:')}</p>
                                            <SubmitButton
                                                no_wrapper
                                                type='submit'
                                                id='btn_submit_verify_password_reset'
                                                text={it.L('Reset MT5 password')}
                                                attributes={{ action: 'verify_password_reset' }}
                                            />
                                        </div>
                                    </form>
                                    <form className='invisible' id='frm_password_reset'>
                                        <FormRow is_two_rows type='select' id='ddl_reset_password_type' label={it.L('Password type')}>
                                            <option value='main'>{it.L('Main')}</option>
                                            <option value='investor'>{it.L('Investor')}</option>
                                        </FormRow>
                                        <FormRow is_two_rows type='password' id='txt_reset_new_password'    label={it.L('New MT5 password')} hint={it.L('Minimum eight characters. Must contain numbers, and mix of upper and lower case letters.')} />
                                        <FormRow is_two_rows type='password' id='txt_reset_re_new_password' label={it.L('Verify new MT5 password')} />
                                        <SubmitButton
                                            no_wrapper
                                            type='submit'
                                            id='btn_submit_password_reset'
                                            text={it.L('Reset MT5 password')}
                                            attributes={{ action: 'password_reset' }}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className='center-text' id='frm_revoke_mam'>
                        <h2>{it.L('Revoke manager')}</h2>
                        <p>{it.L('You may revoke the current manager\'s access.')}</p>
                        <p>{it.L('Assigned manager\'s account ID:')}&nbsp;<span id='mam_id' /></p>
                        <SubmitButton
                            no_wrapper
                            type='submit'
                            id='btn_revoke_mam'
                            text={it.L('Revoke Manager')}
                            attributes={{ action: 'revoke_mam' }}
                        />
                    </form>

                    <div id='frm_cashier'>
                        <div className='gr-row demo-only invisible'>
                            <p className='gr-8 gr-push-2 gr-12-m gr-push-0-m gr-padding-30'>{it.L('This demo account comes with [_1] of virtual funds. Please [_2]contact our customer support team[_3] to replenish virtual funds if your account balance is empty.', '$10,000.00', `<a href="${it.url_for('contact')}">`, '</a>')}</p>
                        </div>
                        <div className='real-only invisible'>
                            <div className='gr-padding-20 gr-parent'>
                                <div className='fill-bg-color center-text mt-container'>
                                    <div className='gr-10 gr-push-1 gr-12-m gr-push-0-m'>
                                        <h3 className='secondary-color'>{it.L('How to manage your funds')}</h3>
                                        <p className='hint'>{it.L('Deposits and withdrawals for your MetaTrader 5 account always pass through your binary options account.')}</p>
                                        <div className='gr-row'>
                                            <div className='gr-5'>
                                                <img src={it.url_for('images/pages/metatrader/dashboard/binary_wallet.svg')} />
                                                <div className='binary-account gr-padding-10' />
                                                <div className='binary-balance gr-padding-10 gr-parent' />
                                                <a className='secondary-color hint' href={it.url_for('cashier')}>{it.L('Add funds')}</a>
                                            </div>
                                            <div className='gr-2 gr-padding-20'>
                                                <img src={it.url_for('images/pages/metatrader/dashboard/transfer.svg')} />
                                            </div>
                                            <div className='gr-5'>
                                                <img src={it.url_for('images/pages/metatrader/dashboard/mt5_wallet.svg')} />
                                                <div className='mt5-account gr-padding-10' />
                                                <div className='mt5-balance gr-padding-10 gr-parent' />
                                                <div className='hint'>{it.L('Deposit or withdraw below')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='gr-row'>
                                <div className='gr-6 gr-12-m flex'>
                                    <div className='mt-panel mt-container'>
                                        <form id='frm_deposit'>
                                            <CashierDesc title={it.L('Transfer funds to your MT5 account')} arrow_direction='right' desc={it.L('Transfer funds from your binary options account into your MetaTrader 5 account.')} />

                                            <div className='form'>
                                                <FormRow is_two_rows type='text' id='txt_amount_deposit' label={it.L('Amount')} attributes={{ maxLength: 10 }} hint={it.L('[_1] transfer fee between different currencies', '1%')} />
                                                <SubmitButton
                                                    is_centered
                                                    is_full_width
                                                    type='submit'
                                                    id='btn_submit_deposit'
                                                    text={it.L('Transfer to MT5')}
                                                    attributes={{ action: 'deposit' }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='gr-6 gr-12-m flex'>
                                    <div className='mt-panel mt-container'>
                                        <form id='frm_withdrawal'>
                                            <CashierDesc title={it.L('Withdraw funds from your MT5 account')} arrow_direction='left' desc={it.L('Transfer funds from your MetaTrader 5 account into your binary options account.')} />

                                            <div className='form'>
                                                <FormRow is_two_rows type='text' id='txt_amount_withdrawal' label={it.L('Amount')} attributes={{ maxLength: 10 }} hint={it.L('[_1] transfer fee between different currencies', '1%')} />
                                                <FormRow is_two_rows type='password' id='txt_main_pass_wd' label={it.L('MetaTrader 5 main password')} />
                                                <SubmitButton
                                                    is_centered
                                                    is_full_width
                                                    type='submit'
                                                    id='btn_submit_withdrawal'
                                                    text={it.L('Withdraw from MT5')}
                                                    attributes={{ action: 'withdrawal' }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='messages'>
                        <div id='msg_set_currency'>{it.L('To perform this action, please set the [_1]currency[_2] of your account.', `<a href="${it.url_for('user/set-currency')}">`, '</a>')}</div>
                        <div id='msg_switch'>{it.L('To perform this action, please switch to your [_1] Real Account.', it.website_name)}</div>
                        <div id='msg_upgrade'>{it.L('To perform this action, please <a href="[_1]">upgrade to [_2] Real Account</a>.', it.url_for('new_account/realws'), it.website_name)}</div>
                        <div id='msg_real_financial'>
                            <span id='msg_metatrader_account' className='invisible'>{it.L('To create a MetaTrader 5 real account, please:')}</span>
                            <span id='msg_mam_account' className='invisible'>{it.L('To create a MAM real account, please:')}</span>
                            <ul className='bullet'>
                                <li className='assessment invisible'>{it.L('Complete the <a href="[_1]">Financial Assessment</a>.', it.url_for('user/settings/assessmentws'))}</li>
                                <li className='authenticate invisible'>{it.L('<a href="[_1]">Authenticate</a> your account by verifying your identity and address.', it.url_for('user/authenticate'))}</li>
                            </ul>
                        </div>
                        <div id='msg_authenticate'>{it.L('To withdraw from MetaTrader 5 Financial Account please <a href="[_1]">Authenticate</a> your Binary account.', it.url_for('user/authenticate'))}</div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default Metatrader;
