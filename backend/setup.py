# command to control the game

import os 

import sys

def main():

    os.environ.setdefault()
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Umm something is not working right"
        ) from exc
    
    execute_from_command_line(sys.argv)
    
    
if __name__ == '__main__':
    main()
    
    
    