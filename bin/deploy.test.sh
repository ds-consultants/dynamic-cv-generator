echo '[TEST] BUILDING' &&
ng build -c=test &&
echo '[TEST] SET FIREBASE' &&
firebase use test &&
echo '[TEST] DEPLOY TO FIREBASE' &&
firebase deploy &&
echo '[TEST] FINISHED'
