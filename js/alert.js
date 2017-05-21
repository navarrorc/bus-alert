$(".bell-notify").click(function() {
    if (confirm('Create an alert?')) {
        $(this).prev('span.text').remove();
    }
});