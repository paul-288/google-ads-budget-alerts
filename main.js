function main() {
  // Iterate through the accounts and print the accounts IDs:
  var accountSelector = AdsManagerApp
    .accounts()
    .orderBy("customer_client.descriptive_name DESC");

  // Set minimum spend and recipient for alerts:
  var minimumSpend = 1; 
  var recipient = 'email@outlook.com';
  var accountsUnderSpending = [];
  var excludeAccounts = ['012-345-6789','012-345-6789','012-345-6789','012-345-6789']
  
  var accountIterator = accountSelector.get();
  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    var thisAccountName = account.getName();
    var thisAccountID = account.getCustomerId();
    if (excludeAccounts.indexOf(thisAccountID) > -1){
        continue
    }
    Logger.log('This is the account: ' + thisAccountName);
    var metricsYesterday = account.getStatsFor("YESTERDAY");
    var spendYesterday = metricsYesterday.getCost();
    Logger.log('This was the spend: €' + spendYesterday);
    if (spendYesterday < minimumSpend) {
      // Vars if spend is below the minimumSpend:
      accountsUnderSpending.push(thisAccountName)
  } 
}
    if (accountsUnderSpending.length > 0) { 
      var mailTitle = 'Warning: One or more accounts not spending budget';
      var mailBody = 'The following accounts had a lower spend yesterday than the minimum spend of €' + minimumSpend + ' . Check the following accounts: ' + accountsUnderSpending;
      sendSimpleTextEmail(recipient, mailTitle, mailBody);
    }
  
    // Send simple text email function
    function sendSimpleTextEmail(recipient, subject, body) {
    MailApp.sendEmail(recipient, subject, body);
  }
}
