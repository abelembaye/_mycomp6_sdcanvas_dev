# Initialize and run the component template frontend in webpack:
# cd ./streamlit_drawable_canvas/frontend
# npm install # install dependencies # done once
# npm start  #the frontend in the development mode

# From a separate terminal, run the template's Streamlit app (python file)
# cd _mycomp6_sdcanvas_dev  # this is were the app.py is
# conda activate streamlit-drawable-canvas
# pip install -e . # install template as editable package (dont forget the "period") (assuming the venv't is activated already) # done once
#  streamlit run app4dev_.py

# -----------------------------------------------------------------------------------
# 1. go to __init__.py file and change the _release=True, and change the version number in setup.py file
# 2. go to the frontend folder file and run "npm run build" to build the frontend
# 3. go to the folder where setup.py file is and run "python setup.py sdist bdist_wheel"
# 4. issue: conda activate  cenv4test
# 5. pip install dist/streamlit-drawable-canvas-0.9.3.0.tar.gz # to install the package
# 6. streamlit run app4dev_.py
# ----------------------------------------------------------------------------------------------------------

import pandas as pd  # pip install pandas
import numpy as np  # pip install numpy
from PIL import Image  # pip install pillow
import streamlit as st  # pip install streamlit
# pip install streamlit-drawable-canvas # to install from pypi
from streamlit_drawable_canvas import st_canvas
import io
import seaborn as sns  # pip install seaborn
import matplotlib.pyplot as plt  # pip install matplotlib
import json
import os
import sys

# currently, don't change canvas_height and canvas_width from 700 and 500 respectively
canvas_width = 700
canvas_height = 500
# respectively, x label upper limit, y label upper limit, distance from left limit to the axes as % of canvas_width, distance from bottom to the x-axis
xlim = 100  # 200 # can changed; and that is what matters which is seen by users
ylim = 100  # 500
# as percentage of canvas_width (.225 is from top of canvas to top of rectangle or ylim)
bottom_margin = 75  # absolute in pixels
left_margin = 84
top_margin = 25
right_margin = 35
scaleFactors = [xlim, ylim, bottom_margin,
                left_margin, top_margin, right_margin]

# if 'saved_state' not in st.session_state or st.session_state.saved_state is None:
#     # print('NEW SESSION')
#     if os.path.exists("saved_state.json"):
#         with open("saved_state.json", "r") as f:
#             saved_state = json.load(f)
#     else:
#         saved_state = {}  # Initialize an empty state if the file doesn't exist
#         with open("saved_state.json", "w") as f:
#             json.dump(saved_state, f)  # Create the file
#     st.session_state['saved_state'] = saved_state
# else:
#     # print('OLD SESSION')
#     saved_state = st.session_state['saved_state']
saved_state = None
# bg_image = Image.open(buf)
bg_image = None

# Specify canvas parameters in application
drawing_mode = st.sidebar.selectbox(
    "Drawing tool:", (   # "freedraw",
        # "xylane",
        "line",
        "coordinate",
        "curve",
        "singlearrowhead",
        "doublearrowhead",
        "text",
        #   "rect",  "point",  # "circle",
        # "polygon",
        "transform"
    )
)

stroke_width = st.sidebar.slider("Stroke width: ", 1, 25, 3)

if drawing_mode == 'point':
    point_display_radius = st.sidebar.slider(
        "Point display radius: ", 1, 25, 3)
stroke_color = st.sidebar.color_picker("Stroke color hex: ")
# bg_color = st.sidebar.color_picker("Background color hex: ", "#eee")
# bg_image = st.sidebar.file_uploader("Background image:", type=["png", "jpg"])

realtime_update = st.sidebar.checkbox("Update in realtime", True)
axes_and_labels = st.sidebar.checkbox("axes and labels?", False)
# axes_and_labels = True

# Create a canvas component
canvas_result = st_canvas(
    fill_color="rgba(255, 165, 0, 0.3)",  # Fixed fill color with some opacity
    stroke_width=stroke_width,
    stroke_color=stroke_color,
    # background_color=bg_color,
    # background_image=Image.open(bg_image) if bg_image else None,
    background_image=bg_image,
    update_streamlit=realtime_update,
    axes_and_labels=axes_and_labels,
    width=canvas_width,
    height=canvas_height,
    drawing_mode=drawing_mode,
    # text=label,  # Use the entered label as the text to be drawn
    point_display_radius=point_display_radius if drawing_mode == 'point' else 0,
    scaleFactors=scaleFactors,  # [80, 40],
    initial_drawing=saved_state,  # this the beginning jason data and drawings
    key="canvas",
)

# initial_drawing = canvas_result.json_data
# st.write("inital_drawing is:", initial_drawing)
# To create and save initial drawing do the following
# with open("initial_drawing.json", 'w') as json_file:
#     json.dump(initial_drawing, json_file, indent=4)
# sys.exit()
# st.write("Canvas data:", canvas_result)

# Do something interesting with the image data and paths
# if canvas_result.image_data is not None:
if canvas_result.image_data is not None:
    # Display the image data
    # to automatically display the image in the streamlit app (kind of duplicate canvas)
    # st.image(canvas_result.image_data)
    # Convert the image data to a PIL Image
    img = Image.fromarray(canvas_result.image_data.astype('uint8'), 'RGBA')
    combined_io = io.BytesIO()

    if bg_image is not None:
        # Resize the user-drawn image to match the size of the background image
        img = img.resize(bg_image.size)
        # Combine the user-drawn image and the background image
        combined = Image.alpha_composite(bg_image.convert('RGBA'), img)
        # Save the combined image to a BytesIO object
        combined.save(combined_io, 'PNG')
    else:
        # Save the user-drawn image to a BytesIO object without merging
        img.save(combined_io, 'PNG')

    combined_io.seek(0)

    # # Create a download button for the image
    st.download_button(
        label="download PNG",
        # data=img_io,
        data=combined_io,
        file_name='image01.png',
        mime='image/png'
    )

# Do something interesting with the JSON data
if canvas_result.json_data is not None:
    # need to convert obj to str because PyArrow
    objects = pd.json_normalize(canvas_result.json_data["objects"])
    for col in objects.select_dtypes(include=['object']).columns:
        objects[col] = objects[col].astype("str")
    st.dataframe(objects)
