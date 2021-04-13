def save_image():
    """
    Take fileStorage and save it into folder.
    """
    pass


def get_path():
    pass


def find_image_any_format():
    """
    Given a format-less filename, try to find the file by appending each of the allowed formats to the given
    filename and check if the file exists
    :param filename: formatless filename
    :param folder: the relative folder in which to search
    :return: the path of the image if exists, otherwise None
    """

    pass


def _retrieve_filename():
    """
    Make our filename related functions generic, able to deal with FileStorage object as well as filename str.
    """
    pass


def is_filename_safe():
    """
    Check if a filename is secure according to our definition
    - starts with a-z A-Z 0-9 at least one time
    - only contains a-z A-Z 0-9 and _().-
    - followed by a dot (.) and a allowed_format at the end
    """

    pass


def get_basename():
    """
    Return file's basename, for example
    get_basename('some/folder/image.jpg') returns 'image.jpg'
    """
    pass


def get_extention():
    """
    Return file's extension, for example
    get_extension('image.jpg') returns '.jpg'
    """
    pass
