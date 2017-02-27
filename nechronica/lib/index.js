function onLanguageItemChange() {
    var lang = $("select#language-switcher option:selected").val();
    $("[data-localize]").localize("text/labels", { language: lang })
}
$(document).ready(function() {
    $("select#language-switcher").change(onLanguageItemChange).change();
});