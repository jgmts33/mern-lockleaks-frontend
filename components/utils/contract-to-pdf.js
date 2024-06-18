import { jsPDF } from 'jspdf';
import moment from 'moment';

export const downloadContract = (userInfo, usernames, socialUsername) => {
    const doc = new jsPDF({
        format: 'a3'
    });

    doc.setFontSize(18);
    doc.text('Lock Leaks Contract Agreement', 108, 12);
    doc.setFontSize(15);
    doc.text('1. Services Provided:', 10, 26);
    doc.setFontSize(12);
    doc.text('Lock Leaks agrees to provide the Client with access to its platform and features. The Client agrees to utilize these services in accordance with the', 10, 32);
    doc.text('terms outlined here in.', 10, 38);
    doc.setFontSize(15);
    doc.text('2. Ownership and Authorization:', 10, 47);
    doc.setFontSize(12);
    doc.text('The Client acknowledges that all content posted or hosted on Lock Leaks is subject to copyright laws. By using the services provided, the Client', 10, 53);
    doc.text('affirms that they have the legal authority to post or host the content and grant authorization to Lock Leaks.', 10, 59);
    doc.setFontSize(15);
    doc.text('3. DMCA Authorization:', 10, 68);
    doc.setFontSize(12);
    doc.text('By accepting this contract, the Client authorizes Lock Leaks to act on their behalf for Digital Millennium Copyright Act (DMCA) compliance. Any', 10, 74);
    doc.text('copyright infringement notices or inquiries should be directed to Lock Leaks at dmca@lockleaks.com.', 10, 80);
    doc.setFontSize(15);
    doc.text('4. Data Handling and Privacy:', 10, 89);
    doc.setFontSize(12);
    doc.text('Lock Leaks agrees to handle all personal data provided by the Client in accordance with its Privacy Policy.', 10, 95);
    doc.setFontSize(15);
    doc.text('5. Contract Parties:', 10, 104);
    doc.setFontSize(12);
    doc.text('This Agreement is between the Client and AD BOOST S.R.L., the entity that owns and operates the Lock Leaks platform.', 10, 110);
    doc.setFontSize(15);
    doc.text('6. Termination of Agreement', 10, 119);
    doc.setFontSize(12);
    doc.text('Either party may terminate this Agreement at any time with prior written notice.', 10, 125);
    doc.setFontSize(15);
    doc.text('7. Governing Law', 10, 134);
    doc.setFontSize(12);
    doc.text('This Agreement shall be governed by and construed in accordance with the laws of Romania. IN WITNESS WHEREOF, the parties hereto have', 10, 140);
    doc.text('executed this Agreement as of the Effective Date.', 10, 146);

    doc.setFontSize(15);
    doc.text('For Lock Leaks:', 10, 164);
    doc.text(`For ${userInfo?.name}:`, 150, 164);
    doc.setFontSize(12);
    doc.text('Full Name: Cosmin Ridel', 14, 173);
    doc.text(`Full Name: ${userInfo.name}`, 154, 173);
    doc.text('Signature: Cosmin Ridel', 14, 179);
    doc.text(`Signature: ${userInfo.name}`, 154, 179);
    doc.text(`Date: ${moment(userInfo?.contract.date).format('MMM DD, YYYY')}`, 14, 185);
    doc.text(`Date: ${moment(userInfo?.contract.date).format('MMM DD, YYYY')}`, 154, 185);
    doc.text(`dmca@lockleaks.com`, 14, 191);
    doc.text(`lockleaks.com`, 14, 197);
    doc.addImage('/assets/logo.png', "PNG", 4, 196, 120, 30);
    doc.setFontSize(15);
    doc.text(`Copyright of Usernames`, 150, 206);
    doc.setFontSize(12)
    doc.text(`The Customer acknowledges and agrees that all usernames listed in the`, 150, 215);
    doc.text(`attached schedule (hereinafter referred to as the "Username List") are`, 150, 221);
    doc.text(`the property of their respective copyright holders. Lock Leaks will `, 150, 227);
    doc.text(`assist the Customer in reporting any unauthorized use or illegal `, 150, 233);
    doc.text(`postings involving these usernames in accordance with the Digital `, 150, 239);
    doc.text(`Millennium Copyright Act (DMCA). The Customer grants Lock Leaks the `, 150, 245);
    doc.text(`authority to act on their behalf in submitting DMCA takedown notices `, 150, 251);
    doc.text(`and other necessary actions to protect their rights.`, 150, 257);

    doc.setFontSize(14);
    doc.text(`Usernames List:`, 150, 272);
    doc.text(`Social Media Username:`, 218, 272);

    doc.setFontSize(12);
    doc.text(`Username: ${socialUsername}`, 222, 281);
    for (let i = 0; i < usernames.length; i++) {
        doc.text(`${i + 1}. Username: ${usernames[i].username}`, 154, 281 + i * 12);
        doc.text(`Link: ${usernames[i].link}`, 159, 281 + i * 12 + 6);
    }

    doc.setFontSize(12);
    doc.setFont("default", "italic");
    doc.text(`AD BOOST S.R.L.`, 10, 265);
    doc.text(`Romania, Bacau, Strada Letea 32, Bloc A, Ap. 116, 600343`, 10, 271);
    doc.text(`Register Code (CUI): 48091747`, 10, 277);
    doc.text(`VAT: RO48091747`, 10, 283);
    doc.addImage('/assets/stamp.png', "PNG", 10, 226, 30, 30);
    doc.save(`Contract (Lock Leaks - ${userInfo?.name}).pdf`);
}