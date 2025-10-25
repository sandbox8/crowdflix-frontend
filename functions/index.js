const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const stripe = require("stripe")(functions.config().stripe.secret_key);

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }

  // Fetch project details from Firestore
  const projectRef = admin
    .firestore()
    .collection("projects")
    .doc(data.projectId);
  const projectDoc = await projectRef.get();

  if (!projectDoc.exists) {
    throw new functions.https.HttpsError(
      "not-found",
      "Project does not exist.",
    );
  }

  const project = projectDoc.data();
  const projectName = project.projectName;

  // Create the Stripe checkout session with project details
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://crowdflix-dot-crowdflix.uc.r.appspot.com/success",
    cancel_url: "http://localhost:8080/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: data.amount, // Use the amount passed from the component
          product_data: {
            name: `Backing project: ${projectName}`, // Use the project's name
          },
        },
      },
    ],
  });

  // Start a batched write to ensure both operations complete successfully
  const batch = admin.firestore().batch();

  // Update the project's funded amount
  batch.update(projectRef, {
    funded: admin.firestore.FieldValue.increment(data.amount / 100),
    backers: admin.firestore.FieldValue.arrayUnion(context.auth.uid),
  });

  // Add the project ID to the user's backedProjects array
  const userRef = admin.firestore().collection("users").doc(context.auth.uid);
  batch.update(userRef, {
    backedProjects: admin.firestore.FieldValue.arrayUnion(data.projectId),
  });

  // Commit the batched write to Firestore
  await batch.commit();

  // Return the session ID to the client
  return {
    id: session.id,
  };
});
