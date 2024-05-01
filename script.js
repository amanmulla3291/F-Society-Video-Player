var video = document.getElementById('myVideo');
        var fileInput = document.getElementById('file-input');
        var folderInput = document.getElementById('folder-input');
        var fileNameElement = document.getElementById('file-name');
        var videoList = document.getElementById('video-list');
        var playPauseButton = document.getElementById('play-pause');
        var volumeInput = document.getElementById('volume');
        var fullscreenButton = document.getElementById('fullscreen');

        fileInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            var fileURL = URL.createObjectURL(file);
            video.src = fileURL;
            fileNameElement.textContent = 'Now playing: ' + file.name;
        });

        folderInput.addEventListener('change', function(e) {
            var files = e.target.files;
            var folderNameElement = document.getElementById('folder-name');
            folderNameElement.textContent = 'Folder selected';
            videoList.innerHTML = '';
            for (var i = 0; i < files.length; i++) {
                if (files[i].type.startsWith('video/')) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.textContent = files[i].name;
                    a.href = URL.createObjectURL(files[i]);
                    a.onclick = function(e) {
                        e.preventDefault();
                        video.src = this.href;
                        fileNameElement.textContent = 'Now playing: ' + this.textContent;
                    };
                    li.appendChild(a);
                    videoList.appendChild(li);
                }
            }
        });

        playPauseButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        volumeInput.addEventListener('input', function() {
            video.volume = volumeInput.value;
        });

        fullscreenButton.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { // Firefox
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }
        });