const router = require("express").Router();
const { json } = require("body-parser");
const { Admin } = require("../models/Admin");
const { User } = require("../models/User");
const Feedback=require("../models/Feedback")


router.get('/getAllUsers',async(req,res)=>{
	console.log("1")
	try {
		console.log("2")
		const response = await User.find()
		console.log("3", response)
		return res.status(200).send(response)
	} catch (error) {
		return res.status(500).send(error)
	}
})


router.post("/signupad", async (req, res) => {
	try {
		let { name, email, password } = req.body;

		let admin = await Admin.findOne({ email });
		console.log("2");
		if (admin)
			return res.status(409).send({ message: "Admin with given email already Exist!" });
		let adminData = new Admin({
			name: name,
			email: email,
			password: password
		})
		let data = await adminData.save();

		console.log("4");
		res.status(201).send({ data: data, message: "Admin Signup successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/loginad", async (req, res) => {
	try {
		let { name, email, password } = req.body;
		let admin = await Admin.findOne({ email });

		let adminData = new Admin({
			name: name,
			email: email,
			password: password
		})
		let data = await adminData.save();

		res.status(201).send({ data: data, message: "Admin Signup successfully" });
} catch (error) {
	res.status(500).send({ message: "Internal Server Error" });
}
});


//new 
router.post('/submitFeedback', async (req, res) => {
	try {
	  const { userId, performance, comment } = req.body;
  
	  // Save the feedback data to the database
	  const feedback = new Feedback({
		userId,
		performance,
		comment,
	  });
  
	  await feedback.save();
  
	  res.status(200).json({ message: 'Feedback submitted successfully!' });
	} catch (error) {
	  console.error('Error submitting feedback:', error);
	  res.status(500).json({ error: 'Something went wrong.' });
	}
  });
  //over
module.exports = router;