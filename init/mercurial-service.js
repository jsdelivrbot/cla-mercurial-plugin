var reg = require("cla/reg");
reg.register('service.mercurial.task', {
    name: _('Mercurial task'),
    icon: '/plugin/cla-mercurial-plugin/icon/mercurial.svg',
    form: '/plugin/cla-mercurial-plugin/form/mercurial-service-form.js',
    handler: function(ctx, params) {

        var ci = require("cla/ci");
        var reg = require('cla/reg');
        var log = require('cla/log');

        var fullCommand,
            commandLaunch,
            commonCommand,
            response;
        var filesPaths = params.filesPaths;
        var commandOption = params.command || "";
        var commitMsg = params.commitMsg || "";
        var branchName = params.branchName || "";
        var hgTagName = params.hgTagName || "";
        var originBranch = params.originBranch || "";
        var mergingBranch = params.mergingBranch || "";
        var errors = params.errors || "fail";
        var validOptions = ["log", "push", "status", "diff"];

        var mercurialRepo = ci.findOne({
            mid: params.mercurialRepo + ""
        });
        if (!mercurialRepo) {
            log.fatal(_("Mercurial CI doesn't exist"));
        }

        var server = mercurialRepo.localRepoServer || "";
        var localPath = mercurialRepo.localPath || "";
        if (server == "") {
            log.fatal(_("Server not selected"));
        }
        if (localPath == "") {
            log.fatal(_("Local path not set"));
        }


        commonCommand = "cd " + localPath + " && hg " + commandOption;
        if (commandOption == "add" || commandOption == "remove") {
            if (filesPaths.length <= 0) {
                log.fatal(_("Nothing selected"));
            }
            fullCommand = commonCommand + " " + filesPaths.join(" ") + ' && hg commit -m "' + commitMsg + '" && hg push';
        } else if (commandOption == "commit") {
            fullCommand = commonCommand + ' -m "' + commitMsg + '" && hg push';
        } else if (commandOption == "update") {
            fullCommand = commonCommand + " " + branchName;
        } else if (commandOption == "tag") {
            fullCommand = commonCommand + " " + hgTagName+ " && hg push";
        } else if (commandOption == "pull") {
            fullCommand = commonCommand + " && hg update";
        } else if (commandOption == "branch") {
            fullCommand = commonCommand + " " + branchName;
            if (branchName.length > 0) {
                fullCommand = fullCommand + ' && hg commit -m "New branch ' + branchName + '" && hg push --new-branch'
            }
        } else if (validOptions.indexOf(commandOption) >= 0) {
            fullCommand = commonCommand;
        } else if (commandOption == "merge") {
            errors = "silent";
            fullCommand = "cd " + localPath + " && hg update " + originBranch + " && export HGMERGE=merge && hg merge " + mergingBranch +
                ' && hg commit -m "Merge branches ' + originBranch + " and " + mergingBranch + '" && hg push';
        } else {
            log.fatal(_("No option selected"));
        }

        function remoteCommand(params, command, server, errors) {
            var output = reg.launch('service.scripting.remote', {
                name: _('mercurial task'),
                config: {
                    errors: errors,
                    server: server,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        commandLaunch = remoteCommand(params, fullCommand, server, errors);

        if ( commandOption == "merge" && ((commandLaunch.rc != 0 && params.errors != "custom") || (params.errors == "custom" && params.rcOk != commandLaunch.rc))){
            log.fatal(_("Error merging. Manual fix needed. ") , response)
        }

        response = commandLaunch.output;
        log.info(_("Task ") + commandOption + _(" finished."), response)

        return response;

    }
});