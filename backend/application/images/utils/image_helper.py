import os
import re
from typing import Union
from werkzeug.datastructures import FileStorage
from flask_uploads import UploadSet, IMAGES

IMAGE_SET = UploadSet('images', IMAGES)  # set name and allowed extentions.
# Important! 'images' should be same as IMAGES in variable UPLOADED_IMAGES_DEST


def save_image(image: FileStorage, folder: str = None, name: str = None) -> str:
    """
    Take fileStorage and save it into folder.
    """
    _folder = f'images/{folder}'
    return IMAGE_SET.save(image, _folder, name)


def get_path(filename: str = None, folder: str = None) -> str:
    """
    Take image name and forder and return full path
    """
    return IMAGE_SET.path(filename, folder)


def find_image_any_format(filename: str = None, folder: str = None) -> Union[str, None]:
    """
    Given a format-less filename, try to find the file by appending each of the allowed
    formats to the given filename and check if the file exists
    :param filename: formatless filename
    :param folder: the relative folder in which to search
    :return: the path of the image if exists, otherwise None
    """
    # print('find_image_any_format, filename ->', filename)
    # print('find_image_any_format, folder ->', folder)
    _folder = f'images/{folder}'
    for _format in IMAGES:
        image = f'{filename}.{_format}'
        image_path = IMAGE_SET.path(filename=image, folder=_folder)
        if os.path.isfile(image_path):
            return image_path
    return None


def _retrieve_filename(file: Union[str, FileStorage]) -> str:
    """
    Make our filename related functions generic, able to deal with
        FileStorage object as well as filename str.
    """
    if isinstance(file, FileStorage):
        return file.filename
    return file


def is_filename_safe(file: Union[str, FileStorage]) -> bool:
    """
    Check if a filename is secure according to our definition
    - starts with a-z A-Z 0-9 at least one time
    - only contains a-z A-Z 0-9 and _().-
    - followed by a dot (.) and a allowed_format at the end
    """
    filename = _retrieve_filename(file)
    allowed_format = '|'.join(IMAGES)
    redex = f'^[a-zA-Z0-9][a-zA-Z0-9_()-\.]*\.({allowed_format})$'
    return re.match(redex, filename) is not None


def is_value_safe(file: Union[str, FileStorage]) -> bool:
    """
    Check if a filename is secure according to our definition
    - starts with a-z A-Z 0-9 at least one time
    - only contains a-z A-Z 0-9 and _()-
    """
    # print('is_value_safe, file ->', file)
    filename = _retrieve_filename(file)
    redex = '^[a-zA-Z0-9][a-zA-Z0-9_()-]*$'
    return re.match(redex, filename) is not None


def get_basename(file: Union[str, FileStorage]) -> str:
    """
    Return file's basename, for example
    get_basename('some/folder/image.jpg') returns 'image.jpg'
    """
    filename = _retrieve_filename(file)
    return os.path.split(filename)[1]


def get_extention(file: Union[str, FileStorage]) -> str:
    """
    Return file's extension, for example
    get_extension('image.jpg') returns '.jpg'
    """
    filename = _retrieve_filename(file)
    return os.path.splitext(filename)[1]
