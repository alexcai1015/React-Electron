<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
        <img src="${url.resourcesPath}/img/logo_purple_title.svg"/>
        ${msg("updatePasswordTitle")?no_esc}
    <#elseif section = "header">
        <img src="${url.resourcesPath}/img/logo_purple_title.svg"/>
    <#elseif section = "form">
        <form id="kc-form-login" class="form update-password ${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <input type="text" readonly value="this is not a login form" style="display: none;">
            <input type="password" readonly value="this is not a login form" style="display: none;">

            <div class="${properties.kcInputWrapperClass!}">
              <div class="mdc-text-field mdc-text-field--outlined ${properties.kcLabelClass!}">
                    <input type="password" id="password-new" name="password-new" class="mdc-text-field__input  ${properties.kcInputClass!}" autofocus autocomplete="off" />
                    <div class="mdc-floating-label ${properties.kcLabelWrapperClass!}">
                      <label for="password-new" class="${properties.kcLabelClass!}">${msg("passwordNew")}</label>
                    </div>
                    <div class="mdc-notched-outline">
                      <svg>
                          <path class="mdc-notched-outline__path"/>
                      </svg>
                    </div>
                    <div class="mdc-notched-outline__idle"></div>
              </div>
            </div>

            <div class="${properties.kcInputWrapperClass!}">
              <div class="mdc-text-field mdc-text-field--outlined update-password-field ${properties.kcFormGroupClass!}">
                    <input type="password" id="password-confirm" name="password-confirm" class="mdc-text-field__input  ${properties.kcInputClass!}" autocomplete="off" />
                    <div class="mdc-floating-label ${properties.kcLabelWrapperClass!}">
                      <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                    </div>
                    <div class="mdc-notched-outline">
                      <svg>
                          <path class="mdc-notched-outline__path"/>
                      </svg>
                    </div>
                    <div class="mdc-notched-outline__idle"></div>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} row update-password-button-container">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!} col-xs-6 col-sm-8">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                    </div>
                </div>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} col-xs-6 col-sm-4">
                    <button id="kc-login" class="mdc-button mdc-button--raised ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit"/>
                    ${msg("doSubmit")}
                    </button>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>