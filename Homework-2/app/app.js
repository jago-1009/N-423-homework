import * as MODEL from "../model/model.js";

function initListeners() {
    MODEL.listenForm();
}
 
$(document).ready(function () {
initListeners();
});