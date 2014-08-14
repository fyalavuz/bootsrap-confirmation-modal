var confirmationDialog = function() {
    this._id = this.makeRandomId();
};

confirmationDialog.prototype.makeRandomId = function() {
    return Math.random().toString(36).substring(5);
};

confirmationDialog.prototype.confirmCallback = function() {};
confirmationDialog.prototype.cancelCallback = function() {};

confirmationDialog.prototype.options = {
    confirmButtonCssClass: 'btn-success',
    cancelButtonCssClass: 'btn-danger',
    title: '',
    text: ''
};

confirmationDialog.prototype.cancelButtonText = 'Cancel';
confirmationDialog.prototype.confirmButtonText = 'OK';

confirmationDialog.prototype.getTemplate = function() {
    var template = typeof this.customTemplate == "undefined" ? this.defaultTemplate() : this.customTemplate();
    return '<div id="' + this._id + '">' + template + '</div>'
};

confirmationDialog.prototype.prepareElement = function() {
    $(document.body).append(this.getTemplate());
};

confirmationDialog.prototype.bindDomEvents = function() {
    var that = this;
    var $el = this.getElement();

    $el.on('hidden.bs.modal', function() { that.onCancel(); });

    var $confirmButton = $el.find('.confirmButton');
    $confirmButton.click(function() { that.onConfirm(); });
};

confirmationDialog.prototype.onCancel = function () {
    this.cancelCallback();
    this.onClose();
};

confirmationDialog.prototype.onConfirm = function () {
    this.confirmCallback();
    this.remove();
};

confirmationDialog.prototype.onClose = function() {
    this.getElement().modal('hide');
    this.remove();
};

confirmationDialog.prototype.getElement = function () {
    return $('#' + this._id + ' .modal');
};

confirmationDialog.prototype.show = function() {
    this.prepareElement();
    this.bindDomEvents();
    this.getElement().modal();
};

confirmationDialog.prototype.remove = function() {
    $('#' + this._id).remove();
    $('.modal-backdrop').remove();
};

confirmationDialog.prototype.defaultTemplate = function() {
    return '<div class="modal" role="dialog">' +
               '<div class="modal-dialog">' +
                   '<div class="modal-content">' +
                       '<div class="modal-header">' +
                           '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                           '<h4 class="modal-title">' + this.options.title + '</h4>' +
                       '</div>' +
                       '<div class="modal-body">' +
                           '<p>' + this.options.text + '</p>' +
                       '</div>' +
                       '<div class="modal-footer">' +
                            '<button type="button" class="btn cancelButton ' + this.options.cancelButtonCssClass + '" data-dismiss="modal">' + this.cancelButtonText + '</button>' +
                            '<button type="button" class="btn confirmButton ' + this.options.confirmButtonCssClass + '">' + this.confirmButtonText + '</button>' +
                       '</div>' +
                   '</div>' +
               '</div>' +
           '</div>';
};
