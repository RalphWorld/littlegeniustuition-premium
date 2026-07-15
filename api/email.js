const nodemailer = require('nodemailer');

function formatSGT(date) {
  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Singapore'
  }).format(date);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    parentName, contactNumber, email, childName,
    level, school, programmes, referral, message
  } = req.body || {};

  if (!parentName || !contactNumber || !email || !childName || !level || !school) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const programmeList = Array.isArray(programmes) && programmes.length
    ? programmes.map((p) => `- ${p}`).join('\n')
    : '- Not specified';

  const body = `This enquiry was submitted via the Little Genius official website.
Submitted: ${formatSGT(new Date())}

PARENT DETAILS
Name: ${parentName}
Contact: ${contactNumber}
Email: ${email}

CHILD DETAILS
Name: ${childName}
School Level: ${level}
Current School: ${school}

PROGRAMME INTEREST
${programmeList}

REFERRAL SOURCE
${referral || 'Not specified'}

MESSAGE
${message && message.trim() ? message.trim() : 'No additional message provided.'}
`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Little Genius Website" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: 'New Website Enquiry — Little Genius Learning & Care Centre',
      text: body
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
