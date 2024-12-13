const getUser = (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading from a database...");
			resolve({ id, username: "Mosh" })
		}, 2000);
	})
};

const getRepository = (username) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading github info...");
			resolve({ username, address: `http://github.com/${ username }/node-study` });
		}, 2000);
	})
};


console.log("Before");

getUser(3)
	.then((user) => getRepository(user.username))
	.then((gitInfo) => console.log(gitInfo));

console.log("After");

