// assets/texts/terms.js
const terms = [
    {
        type: 'paragraph',
        text: 'These Terms and Conditions (“Terms”) constitute a legally binding agreement between you (“you,” “your,” or “User”) and Clients Account Limited (“Clients Account,” “we,” “us,” or “our”), the owner and operator of the Clients Account mobile application (the “App”) and all services made available through the App or otherwise accessible by you through associated platforms, software, or interfaces whether now existing or developed in the future (collectively, the “Services”).',
    },
    {
        type: 'paragraph',
        text: 'By accessing, downloading, installing, or in any way using the App and/or any of the Services provided, whether through mobile, desktop, or any other platform now known or developed hereafter, you affirm that you have read, understood, and agree to be legally bound by the provisions outlined herein. If you do not accept any part of these Terms, you must refrain from using the App or accessing any Services provided therein.',
    },

    // Section 1
    {
        number: 1,
        type: 'section',
        title: 'Overview of the Service',
        content: [
            'The Clients Account App is a digital platform designed specifically for legal professionals, including but not limited to licensed lawyers, barristers, solicitors, and other authorized legal practitioners.',
            'The App offers the following core functionalities:',
            '- The ability to digitally create, register, and manage a Chamber Name, which serves as your legal practice’s identifier within the platform.',
            '- Access to a secure and encrypted digital wallet, which can be funded, managed, and used for professional purposes as defined in these Terms.',
            '- Provision of wallet management services, including but not limited to transaction logging, balance reconciliation, and monthly reporting.',
            '- As well as a fixed fee structure, applied monthly on wallet balances.',
            'The App does not function as a bank, credit union, or licensed financial institution, and it does not provide loans, credit facilities, or interest-bearing accounts yet. The Services are strictly utility-based and operate under applicable Nigerian fintech guidelines.',
        ],
    },

    // Section 2
    {
        number: 2,
        type: 'section',
        title: 'Eligibility Requirements',
        content: [
            'To access or use the App and the associated Services, you represent, warrant, and affirm that:',
            '- Professional Status: You are duly registered, certified, and authorized to practice law within the jurisdiction of Nigeria or another recognized jurisdiction, and you hold all necessary licenses, certificates, or credentials required by law.',
            '- Age of Majority: You are at least eighteen (18) years of age or older and are legally capable of entering into binding contracts in accordance with the applicable laws of the Federal Republic of Nigeria.',
            '- Authority: If you are entering into this Agreement on behalf of a law firm, chamber, or legal entity, you have the full legal authority to bind such entity to these Terms.',
            'You agree to immediately cease use of the App and Services if any of the above conditions cease to be true.',
        ],
    },

    // Section 3
    {
        number: 3,
        type: 'section',
        title: 'Account Registration and User Credentials',
        content: [
            'In order to utilize the App and Services, you are required to create a user account. By doing so, you agree to the following:',
            '- Accuracy of Information: You will provide accurate, current, and complete information during registration and will keep such information up to date at all times.',
            '- Security of Login Credentials: You are solely responsible for safeguarding your password, PIN, or other access credentials. You agree not to share your credentials with any unauthorized person or third party.',
            '- Notification of Unauthorized Use: You agree to promptly notify Clients Account if you become aware of or suspect any unauthorized use or access to your account.',
            '- Assumption of Risk: You assume full responsibility for all activities that occur under your account, whether authorized by you or not, except where such access arises solely due to Clients Account’s gross negligence or willful misconduct.',
            'Clients Account shall not be held liable for any loss, damages, or unauthorized access that may result from your failure to comply with these security obligations.',
        ],
    },

    // Section 4
    {
        number: 4,
        type: 'section',
        title: 'Wallet Services and Applicable Fees',
        content: [
            'The App includes a digital wallet (“Wallet”) feature, which allows Users to manage funds in connection with their legal practice. The following provisions apply:',
            '- Fee Structure: A Statutory deduction of ₦750 (Seven Hundred and Fifty Naira) shall be made as service/maintenance charge at the end of each calendar month. This charge is subject to review and may be increased up to N1000 (One Thousand Naira) depending on changes in economic market conditions as well as the inflow/outflow of cash, with prior written notice via registered emails to all users.',
            '- Automatic Deduction: The monthly fee will be automatically deducted from your Wallet balance on the last day of each month, without the need for further authorization.',
            '- No Refunds: All fees deducted are non-refundable, except where such deduction arises due to a proven system error.',
            'Clients Account reserves the right to adjust the fee structure, billing cycle, or threshold balance requirement with a minimum of 14 days’ notice, to be delivered via in-App notification or email.',
        ],
    },

    // Section 5
    {
        number: 5,
        type: 'section',
        title: 'Deposits and Withdrawals',
        content: [
            'You may fund or withdraw from your Wallet using supported payment methods. The following terms apply:',
            '- Funding Methods: You may deposit funds via debit card, bank transfer, or other methods made available in the App. Processing times may vary depending on the method and third-party providers.',
            '- Withdrawal Procedures: Withdrawals are subject to verification and may be processed through linked bank accounts or other supported mechanisms.',
            '- Transaction Charges: Withdrawal or deposit transactions may incur charges imposed by third-party payment processors or banks. Clients Account does not control or retain these charges.',
            '- Processing Delays: Clients Account is not liable for any delays, failures, or errors resulting from third-party platforms or banking institutions beyond its reasonable control.',
        ],
    },

    // Section 6
    {
        number: 6,
        type: 'section',
        title: 'Permissible Use and User Responsibilities',
        content: [
            'By using the App, you agree to the following conditions and restrictions:',
            '- You will only use the Wallet and App for lawful and professional purposes consistent with your practice as a legal professional.',
            '- You will not engage in any activity that may be construed as illegal, unethical, or in violation of any financial regulations or bar association guidelines.',
            'You shall not use the Wallet for:',
            '  - Money laundering',
            '  - Fraudulent or fictitious transactions',
            '  - Ponzi or pyramid schemes',
            '  - Gambling or betting activities',
            '  - Transactions involving prohibited substances or services',
            'You agree to comply with all applicable anti-money laundering (AML) and know-your-customer (KYC) requirements as may be introduced from time to time.',
            'Violation of any of the above may result in immediate suspension or permanent termination of your account, with or without prior notice, in Clients Account’s sole discretion.',
        ],
    },

    // Section 7
    {
        number: 7,
        type: 'section',
        title: 'Modification of Services, Terms, or Fees',
        content: [
            'Clients Account reserves the unilateral right to update, revise, amend, or otherwise modify:',
            '- The features or functionalities of the App',
            '- The terms of service or usage policies',
            '- The applicable fees, charges, or thresholds',
            '- The methods of notification and communication',
            'Where such modifications are material in nature (i.e., affecting core user obligations or rights), we will make reasonable efforts to notify you at least 14 days in advance, via email or App notification.',
            'Your continued use of the App after the effective date of any such modifications shall be deemed as your full and final acceptance.',
        ],
    },

    // Section 8
    {
        number: 8,
        type: 'section',
        title: 'Termination and Account Closure',
        content: [
            'You may choose to close your account at any time by following the account deletion or closure procedures within the App. Please note:',
            '- Termination shall not affect any rights or obligations accrued prior to the date of closure.',
            'Clients Account reserves the right to suspend or terminate your account without prior notice if:',
            '  - You violate any provisions of these Terms',
            '  - You are suspected of engaging in illegal activity',
            '  - You fail to meet eligibility or verification standards',
            'Upon termination, any available balance will be refunded to your verified bank account, subject to completion of compliance checks.',
        ],
    },

    // Section 9
    {
        number: 9,
        type: 'section',
        title: 'Limitation of Liability',
        content: [
            'To the fullest extent permitted by applicable law:',
            'Clients Account shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, data, goodwill, or professional reputation.',
            'Clients Account is not responsible for losses due to:',
            '  - Unauthorized access resulting from your own negligence',
            '  - Technical failure of third-party systems',
            '  - Force majeure events such as natural disasters, cyber-attacks, or governmental actions',
            'Our total liability to you for any cause whatsoever shall not exceed the total service fees paid by you within the preceding three (3) calendar months prior to the incident giving rise to the claim.',
        ],
    },

    // Section 10
    {
        number: 10,
        type: 'section',
        title: 'Dispute Resolution and Arbitration',
        content: [
            'In the event of any dispute, claim, or controversy arising out of or relating to these Terms, including but not limited to the use of the App or Services, such dispute shall be:',
            '- Resolved by binding arbitration, administered in accordance with the Arbitration and Conciliation Act of Nigeria.',
            '- The arbitration shall be conducted in Port Harcourt, Rivers State, Nigeria, in the English language.',
            '- Each party shall bear its own legal fees, with arbitration costs split equally unless otherwise directed by the arbitrator.',
            '- The decision of the arbitrator shall be final and enforceable in any court of competent jurisdiction.',
        ],
    },

    { type: 'paragraph', text: 'By clicking “I Agree” during sign-up, you acknowledge that you have read, understood, and accepted these Terms and Conditions.' },
];

export default terms;
