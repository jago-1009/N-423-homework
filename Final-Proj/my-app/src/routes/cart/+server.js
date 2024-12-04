import sgMail from "@sendgrid/mail";
import { PRIVATE_SENDGRID_API_KEY } from '$env/static/private';
export async function POST({request, response}) {
  sgMail.setApiKey(PRIVATE_SENDGRID_API_KEY);

  const msg = {
    to: "garwoodj22@gmail.com",
    from: "armorcoach084@gmail.com",
    subject: "You have a new Order!",
    html: "<h1>New Order</h1> <p>Hello Admin! You have a new group order that has exceeded your limit of $200!</p>",
  };

  console.log("Form submitted");
  
  try {
    const output = await sgMail.send(msg);
    return new Response(output, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(error.message, { status: 500 });
  }
}