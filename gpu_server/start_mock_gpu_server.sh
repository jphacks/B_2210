#!/bin/bash

source ~/.bash_profile
conda activate ldm
python init_job_list.py 
mate-terminal --tab --title="http server" -e "bash -c 'python http_server.py'" &
mate-terminal --tab --title="backend mock receive image" -e "bash -c 'python backend_mock_receive_image.py'" &
mate-terminal --tab --title="mock send image" -e "bash -c 'python mock_send_image.py'" &