(function(params) {

    var commandComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Command'),
        data: [
            ['status',_('status')],
            ['log',_('log')],
            ['push',_('push')],
            ['pull',_('pull')],
            ['add',_('add')],
            ['commit',_('commit')],
            ['update',_('update')],
            ['diff',_('diff')],
            ['branch',_('branch')],
            ['branches',_('branches')],
            ['merge',_('merge')],
            ['tag',_('tag')],
            ['tags',_('tags')],
            ['remove',_('remove')]
        ],
        value: params.data.command || 'status',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var mercurialRepoCombo = Cla.ui.ciCombo({
        name: 'mercurialRepo',
        class: 'mercurialRepository',
        fieldLabel: _('Mercurial repository'),
        value: params.data.mercurialRepo || '',
        with_vars: 1,
        allowBlank: false
    });


    var commitMsgTextField = Cla.ui.textField({
        name: 'commitMsg',
        fieldLabel: _('Commit message'),
        value: params.data.commitMsg || '',
        allowBlank: true,
        hidden: ((params.data.command != 'add') || (params.data.command != 'commit') || (params.data.command != 'remove'))
    });

    var branchNameTextField = Cla.ui.textField({
        name: 'branchName',
        fieldLabel: _('Branch name'),
        value: params.data.branchName || '',
        allowBlank: true,
        hidden: ((params.data.command != 'update') || (params.data.command != 'branch'))
    });

    var hgTagNameTextField = Cla.ui.textField({
        name: 'hgTagName',
        fieldLabel: _('Tag name'),
        value: params.data.hgTagName || '',
        allowBlank: true,
        hidden: (params.data.command != 'tag')
    });

    var originBranchTextField = Cla.ui.textField({
        name: 'originBranch',
        fieldLabel: _('Origin branch'),
        value: params.data.originBranch || '',
        allowBlank: true,
        hidden: (params.data.command != 'merge')
    });

    var mergingBranchTextField = Cla.ui.textField({
        name: 'mergingBranch',
        fieldLabel: _('Merging branch'),
        value: params.data.mergingBranch || '',
        allowBlank: true,
        hidden: (params.data.command != 'merge')
    });

    var filesPathsArrayGrid = new Baseliner.ArrayGrid({
        fieldLabel: _('Files paths'),
        name: 'filesPaths',
        value: params.data.filesPaths,
        description: _('Files paths'),
        default_value: '.',
        hidden: ((params.data.command != 'add') || (params.data.command != 'remove') || (params.data.command != 'commit'))
    });

    commandComboBox.on('addItem', function() {
        var v = commandComboBox.getValue();
        if (v == 'add' || v == 'remove') {
            commitMsgTextField.show();
            filesPathsArrayGrid.show();
            branchNameTextField.hide();
            originBranchTextField.hide();
            mergingBranchTextField.hide();
            hgTagNameTextField.hide();
            hgTagNameTextField.allowBlank = true;
            originBranchTextField.allowBlank = true;
            mergingBranchTextField.allowBlank = true;
            commitMsgTextField.allowBlank = false;
        } else if (v == 'commit') {
            commitMsgTextField.show();
            filesPathsArrayGrid.hide();
            branchNameTextField.hide();
            originBranchTextField.hide();
            mergingBranchTextField.hide();
            hgTagNameTextField.hide();
            hgTagNameTextField.allowBlank = true;
            originBranchTextField.allowBlank = true;
            mergingBranchTextField.allowBlank = true;
            commitMsgTextField.allowBlank = false;
        } else if (v == 'update' || v == 'branch') {
            commitMsgTextField.hide();
            filesPathsArrayGrid.hide();
            branchNameTextField.show();
            originBranchTextField.hide();
            mergingBranchTextField.hide();
            hgTagNameTextField.hide();
            hgTagNameTextField.allowBlank = true;
            originBranchTextField.allowBlank = true;
            mergingBranchTextField.allowBlank = true;
            commitMsgTextField.allowBlank = true;
        } else if (v == 'merge') {
            commitMsgTextField.hide();
            filesPathsArrayGrid.hide();
            branchNameTextField.hide();
            originBranchTextField.show();
            mergingBranchTextField.show();
            hgTagNameTextField.hide();
            hgTagNameTextField.allowBlank = true;
            originBranchTextField.allowBlank = false;
            mergingBranchTextField.allowBlank = false;
            commitMsgTextField.allowBlank = true;
        } else if (v == 'tag') {
            commitMsgTextField.hide();
            filesPathsArrayGrid.hide();
            branchNameTextField.hide();
            originBranchTextField.hide();
            mergingBranchTextField.hide();
            hgTagNameTextField.show();
            hgTagNameTextField.allowBlank = false;
            originBranchTextField.allowBlank = true;
            mergingBranchTextField.allowBlank = true;
            commitMsgTextField.allowBlank = true;
        } else {
            commitMsgTextField.hide();
            filesPathsArrayGrid.hide();
            branchNameTextField.hide();
            originBranchTextField.hide();
            mergingBranchTextField.hide();
            hgTagNameTextField.hide();
            hgTagNameTextField.allowBlank = true;
            originBranchTextField.allowBlank = true;
            mergingBranchTextField.allowBlank = true;
            commitMsgTextField.allowBlank = true;
        }
    });


    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            commandComboBox,
            mercurialRepoCombo,
            branchNameTextField,
            hgTagNameTextField,
            originBranchTextField,
            mergingBranchTextField,
            commitMsgTextField,
            filesPathsArrayGrid,
            errorBox
        ]
    });


    return panel;
})