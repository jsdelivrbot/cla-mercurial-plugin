var ci = require("cla/ci");

ci.createRole("Mercurial");

ci.createClass("mercurialRepository", {
    form: '/plugin/cla-mercurial-plugin/form/mercurial-ci-form.js',
    icon: '/plugin/cla-mercurial-plugin/icon/mercurial.svg',
    roles: ["Mercurial", "ClariveSE"],
    has: {
        localPath: {
            is: "rw",
            isa: "Str",
            required: true
        },
        localRepoServer: {
            is: "rw",
            isa: "ArrayRef",
            required: true
        },
        repo_dir: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});