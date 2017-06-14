# Mercurial SCM plugin

Mercurial SCM plugin will allow you to manage your repositories for Mercurial from a Clarive instance.

## Requirements

You must have Mercurial installed in the remote server in order to make the commands work properly.

## Installation

To install the plugin, place the cla-mercurial-plugin folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed, you will have a new palette service called 'Mercurial task', and a new CI for the repositories you wish to manage from Clarive, called 'MercurialRepository'.

### MercurialRepository CI:

You will be able to save your repository parameters in this CI. The main fields are:

- **Server** - Choose the server CI where you want to manage repository changes.
- **Local path for repository** - Full path for the folder you want to sync with the repository at the server.
- **Repository URL** - URL for the repository that will be managed.

Configuration example:

    Server: Remote_Server
    Local path for repository: /dir/secondDir/workingDir/
    Repository URL: http://exampleRepoURL.com/repoExample

### Mercurial task:

This palette service will let you choose the option that you wish to perform at the remote server.
The various parameters from the palette service are:

- **Command** - Via this parameter you can choose the main command you wish to launch. Depending on the selected option, you will have different fields to fill out.
The different options to choose from are:
    - add: add files to be tracked and push then to the reository.
    - status: check the status of the local files with the repository.
    - log: print the logs of the repository.
    - diff: print the differences between local files and remote ones.
    - branch: creates a new branch or prints the current one. When creating a new branch, it will be uploaded to the repository automatically.
    - branches: lis all available branches.
    - tag: creates a tag and push it to the repository.
    - tags: list all the tags.
    - push: push the changes into the repository.
    - pull: download changes from the repository.
    - commit: prepare changes files to be uploaded and push them.
    - update: changes between branches.
    - remove: remove files and push changes to the repository.
    - merge: combine different branches.

- **Mercurial repository** - Select the CI with the server and repository you wish to manage.

Configuration example:

    Command: add
    Server: remote_server
    Commit message: first commit
    Files paths: menu.txt
                README.md
                /init/code/test_code.c
    Errors: fail
    Output: 

    NOTE: when adding files, the path is considering you are located at the local working directory of the project.
