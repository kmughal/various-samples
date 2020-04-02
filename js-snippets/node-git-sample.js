const git = require("nodegit")
const pathToRepo = require("path").resolve("../")
const figlet = require("figlet")

figlet("Node Git", (e, text) => {
    if (e) {
        console.log(e)
        return
    }
    console.log(text)
})
const getLatestCommit = rep => rep.getBranchCommit("master")
git
    .Repository
    .open(pathToRepo)
    .then(rep => ({ commit: rep.getBranchCommit("master"), status: rep.getStatus() }))

    .then(({ commit, status }) => {
        status.then(files => {
            let c = 0
            for (let f of files) {
                console.log("Number :", ++c)
                console.log("Path:", f.path())
                console.log("File status:", f.status())
                console.log("inIndex:", f.inIndex())
                console.log("====================================")
            }
        }).catch(e => console.log("status error:", e))

        commit.then(c => {
            const author = c.author()
            console.log("Author Information :")
            console.log("Name : ", author.name())
            console.log("Email : ", author.email())
            console.log("====================================")

            const history = c.history()

            history.on("commit", _c => {

                console.log("Message :",_c.message())
                console.log("Sha :",_c.sha())

            })

            history.on("end", _c => {
                // console.log(_c)
            })

            history.start()
        })



    })
    .catch(e => console.log(e))
