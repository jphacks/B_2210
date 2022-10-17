# GPU Server
## How to start mock server
- edit url in mock_send_image.py to the url of the backend server
- ./start_mock_gpu_server.sh
## http messages
- receives POST from backend like; {"prompt":"Cyberpunk style image of a Tesla car reflection in rain", "id":0}
- sends POST to backend like; {"id":0, "0":<bytes of image>, "1":<bytes of image>}
- for more info on sending image, see https://raahii.github.io/posts/files-upload/