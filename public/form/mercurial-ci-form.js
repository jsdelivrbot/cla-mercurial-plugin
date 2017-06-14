(function(params) {

    var data = params.rec || {};

    var localRepoServerCombo = Cla.ui.ciCombo({
        name: 'localRepoServer',
        class: 'generic_server',
        fieldLabel: _('Server'),
        value: params.rec.localRepoServer || '',
        with_vars: 1,
        allowBlank: false
    });

    var localPathTextField = Cla.ui.textField({
        name: 'localPath',
        fieldLabel: _('Local path for repository'),
        value: params.rec.localPath || '',
        allowBlank: false
    });

    var repoPathTextField = Cla.ui.textField({
        name: 'repo_dir',
        fieldLabel: _('Repository URL'),
        value: params.rec.repo_dir || '',
        allowBlank: false
    });

    return [
        localRepoServerCombo,
        localPathTextField,
        repoPathTextField
    ]
})