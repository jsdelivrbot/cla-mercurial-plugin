# Mercurial SCM plugin

<img src="https://cdn.rawgit.com/clarive/cla-mercurial-plugin/master/public/icon/mercurial.svg?sanitize=true" alt="Mercurial Plugin" title="Mercurial Plugin" width="120" height="120">

Mercurial SCM plugin will allow you to manage your repositories for Mercurial from a Clarive instance.

## Requirements

You must have Mercurial installed in the remote server in order to make the commands work properly.

## Installation

To install the plugin, place the cla-mercurial-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

### MercurialRepository

To configurate the Mercurial Server Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Mercurial.

You will be able to save your repository parameters in this CI. The main fields are:

- **Server** - Choose the server CI where you want to manage repository changes.
- **Local path for repository** - Full path for the folder you want to sync with the repository at the server.
- **Repository URL** - URL for the repository that will be managed.

Configuration example:

    Server: Remote_Server
    Local path for repository: /dir/secondDir/workingDir/
    Repository URL: http://exampleRepoURL.com/repoExample

### Parameters

The available parameters for the service are:

- **Command (variable name: command)** - Via this parameter you can choose the main command you wish to launch. Depending on the selected option, you will have different fields to fill out.
The different options to choose from are:
    - add ("add"): add files to be tracked and push then to the reository.
    - status ("status"): check the status of the local files with the repository.
    - log ("log"): print the logs of the repository.
    - diff ("diff"): print the differences between local files and remote ones.
    - branch ("branch"): creates a new branch or prints the current one. When creating a new branch, it will be uploaded to the repository automatically.
    - branches ("branches"): lis all available branches.
    - tag ("tag"): creates a tag and push it to the repository.
    - tags ("tags"): list all the tags.
    - push ("push"): push the changes into the repository.
    - pull ("pull"): download changes from the repository.
    - commit ("commit"): prepare changes files to be uploaded and push them.
    - update ("update"): changes between branches.
    - remove ("remove"): remove files and push changes to the repository.
    - merge ("merge"): combine different branches.
- **Mercurial repository (mercurial_repo)** - Select the Resource with the server and repository you want to manage.

**Only Clarive EE**

- **Errors and Output** - These two fields are related to manage control errors. Options are:
   - **Fail and Output Error** - Search for configurated error pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Warn and Output Warn** - Search for the configured warning pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Custom** - The the Errors combo is set to custom, a new form is displayed for defining behavior using these fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
      - **Warn** - Range of return code values to warn the user. A warn message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the monitor.
   - **Silent** - Silence all errors found.

## How to use

NOTE: when adding files, the path is considering you are located at the local working directory of the project.

### In Clarive EE

You can find this service in the Rule Designer palette.

Op Name: **Mercurial Task**

The diferents configurations are:

```yaml
    Command: status
    Mercurial Repo: mercurial_resource
``` 

```yaml
    Command: add
    Mercurial Repo: mercurial_resource
    Commit message: first commit
    Files paths: menu.txt
                README.md
                /init/code/test_code.c
``` 

```yaml
    Command: update
    Mercurial Repo: mercurial_resource
    Branch Name: another_branch
``` 

```yaml
    Command: merge
    Mercurial Repo: mercurial_resource
    Origin Branch: new_branch
    Merging Branch: master_branch
``` 

```yaml
    Command: tag
    Mercurial Repo: mercurial_resource
    Tag Name: new_tag
``` 

```yaml
    Command: branch
    Mercurial Repo: mercurial_resource
    Branch Name: new_branch
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Configuration examples:

```yaml
rule: Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'status'       # Required.
```

```yaml
rule: Yet another Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'add'       # Required.
       commit_msg: 'add msg'
       files_paths: ['src/new_file.txt', '/build/another.file']
```

```yaml
rule: Yet another Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'update'       # Required.
       branch_name: 'another_branch'
```

```yaml
rule: Yet another Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'merge'       # Required.
       origin_branch: 'new_branch'
       merging_branch: 'master_branch'
```

```yaml
rule: Yet another Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'tag'       # Required.
       tag_name: 'new_tag'
```

```yaml
rule: Yet another Mercurial demo
do:
   - mercurial_task:
       mercurial_repo: mercurial_resource    # Required. Use the mid set to the resource you created
       command: 'branch'       # Required.
       branch_name: 'new_branch'
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get an error returned by the console.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "mercurial_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `maps` not available for op "mercurial_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.