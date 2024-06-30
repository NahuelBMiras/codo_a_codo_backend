import sys

project_home = '/home/nahuelBmiras/codo_a_codo_backend'
if project_home not in sys.path:
    sys.path.append(project_home)

from app import create_app

application = create_app()
