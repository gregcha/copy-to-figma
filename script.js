function copyToFigma(event) {

    // get the copy button
    const copyButton = document.getElementById(event.target.id);

    // change button text to inform user operation in progress
    copyButton.textContent = "Copied to clipboard";


    fetch(`figma/code/${event.target.id}.txt`)
    .then(response => response.text())
    .then(data => {
        if (data) {
            navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([data], {type: 'text/html'})
                })
            ]).then(() => {
                console.log("Figma code successfully copied to clipboard.");
            }).catch(err => {
                console.error("Failed to copy Figma code: ", err);
            });

        } else {
            console.log('Code not available');
        }
    })
    .catch(error => {
        console.log('Error fetching figma-code:', error);
    });


    //after 1 second, set button text back
    setTimeout(() => {
      copyButton.textContent = "Copy to Figma";
    }, 1500);

}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.className === 'copy-button') {
            copyToFigma(event)
        }
    });
});


