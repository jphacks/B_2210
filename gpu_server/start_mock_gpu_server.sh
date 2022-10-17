#!/bin/bash

source ~/.bash_profile
conda activate ldm
python init_job_list.py 
gnome-terminal -- bash -c "ngrok http 8000"
gnome-terminal -- bash -c "python http_server.py"
