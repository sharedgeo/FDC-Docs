Guide to FDC-Demo
=====================

This repository contains the files needed to build a Docker image to run the FDC demonstration / development build. The configuration here is simplified for ease of getting started in a trusted environment and is not meant for production use. In particular, be aware that default, insecure passwords are used and that the PostgreSQL database is ephemeral as it lives inside the container.

The FDC-Demo comes with test configuration. These are "fake" user data and tickets with fictional features that are located in South-Eastern Dakota County, MN. It also comes with a "fake" ticket loader that randomly generates tickets at your current location.

The general structure of the FDC-Demo is to build one image that contains everything (see Dockerfile) and then use that image to start several containers from that image that encapsulate each part of FFDC (as defined in docker-compose.yml). Since the target for FDC-Demo is demonstration and development, it is assumed that all of the containers will likely be running on one machine and sharing one image keeps the actual on-disk footprint smaller.

Containers
-----------

FDC-Demo consists of the following containers:

  * 

FDC-Demo is tested to work with Docker and Podman, and on x86-64 and aarch64 (arm64).

Git Notes
----------

Be aware that this repository uses git submodules to pull in the various parts of FuzionView needed to build the Docker image.

Cloning
--------

.. code-block::

    git clone --recurse-submodules git@github.com:SharedGeo/FDC-Demo

Pulling (Updating)
-------------------

.. code-block::

   git pull --recurse-submodules

Pushing
--------

If pushing changes to the FDC-Demo repo, it is recommended to use:

.. code-block::

   git push --recurse-submodules=check

This will avoid pushing an update to FDC-Demo that requires commits that are not yet pushed to the submodules.

Make this option the default for this repo:

.. code-block::

   git config push.recurseSubmodules check

Make this the default option for all repos:

.. code-block::

   git config --global push.recurseSubmodules check

Also, note that because submodules checkout a specific commit hash, the submodules will initially be in a detached head state. Before making changes to a submodule, it is likely a good idea to switch to the main branch.

Example:

.. code-block::

   cd src/FDC-Engine
    git checkout main
    ... work ...
    git add ...
    git commit
    git push

Then work within that submodule normally, potentially rebuilding and testing the Docker image, and committing and pushing the work to the submodule.

Update FDC-Demo
---------------

To update FDC-Demo to use the new version of the submodule git add it and commit, and push.

Example:

.. code-block::

   cd ../.. # back to FDC-Demo
    git add src/FDC-Engine
    git commit -m 'Updating FDC-Engine to include new changes from ...'
    git push

Docker
-------

Building/Running with Docker

.. code-block::

   DOCKER_BUILDKIT=1 docker-compose build

.. code-block::

   docker-compose up -d && docker-compose logs -f

.. code-block::

   docker-compose down -t0

Podman
-------

Building/Running with Podman

.. code-block::

   podman-compose build

.. code-block::

   podman-compose up -d && podman-compose logs -f

.. code-block::

   podman-compose down -t0

Accessing the FDC-Demo
======================

  * Once the containers are running, the FDC web interface will be available on https://localhost:4443.
  * The default username is **demo** and default password is **fdc**.
  * Right now, the FDC-Admin interface depends on the SharedGeo Keycloak server and requires a Keycloak account.

PostgreSQL
-----------

The PostgreSQL database inside the container is made available on port 54321. And can be accessed, for example, with:

.. code-block::

   psql 'host=localhost port=54321 dbname=fdc user=fdc_admin password=password'

Shell Access
-------------

Shell access to the various containers is available via the standard Docker/Podman tools. For example:

.. code-block::

   docker-compose exec fdc-apache-server bash
   podman-compose exec fdc-apache-server bash

Last Updated: |today|
