function showAlert(type, message) {
    const map = {
        success: 'success',
        error: 'error',
        danger: 'error',
        warning: 'warning',
        info: 'info'
    };

    iziToast[map[type] || 'info']({
        message: message,
        position: "topCenter",
        timeout: 3000
    });
}

function showConfirmation(message, callback) {
    $("#iziConfirmModal").iziModal('setSubtitle', message);

    $("#iziConfirmModal").iziModal('setContent', `
    <div class="text-center p-3">
      <button id="iziYes" class="btn btn-danger me-2">Yes</button>
      <button id="iziNo" class="btn btn-secondary">Cancel</button>
    </div>
  `);

    $("#iziConfirmModal").iziModal('open');

    $(document).off("click", "#iziYes").on("click", "#iziYes", function () {
        $("#iziConfirmModal").iziModal('close');
        callback();
    });

    $(document).off("click", "#iziNo").on("click", "#iziNo", function () {
        $("#iziConfirmModal").iziModal('close');
    });
}



$(document).ready(function () {
    $("#iziConfirmModal").iziModal({
        title: "Confirmation",
        subtitle: "Are you sure?",
        headerColor: "#6C0938",
        width: 400,
        overlayClose: false,
        closeButton: false,
        timeoutProgressbar: false,
        bodyOverflow: true
    });
});