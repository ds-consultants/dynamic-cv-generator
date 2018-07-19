echo '[PRODUCTION] BUILDING' &&
ng build -c=prod &&
echo '[PRODUCTION] SET FIREBASE' &&
firebase use default &&
echo '[PRODUCTION] DEPLOY TO FIREBASE' &&
firebase deploy &&
echo '[PRODUCTION] FINISHED'

