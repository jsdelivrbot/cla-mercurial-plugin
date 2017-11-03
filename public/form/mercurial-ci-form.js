(function(params) {

    var data = params.rec || {};

    var localRepoServerCombo = Cla.ui.ciCombo({
        name: 'localRepoServer',
        role: 'Server',
        fieldLabel: _('Server'),
        value: params.rec.localRepoServer || '',
        with_vars: 1,
        allowBlank: false
    });

    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
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
        userTextField,
        localPathTextField,
        repoPathTextField
    ]
})