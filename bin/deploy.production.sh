echo '[PRODUCTION] BUILDING' &&
ng build -c=prod &&
echo '[PRODUCTION] SET FIREBASE' &&
firebase use default &&
echo '[PRODUCTION] SET FIREBASE' &&
firebase deploy &&
echo '[PRODUCTION] FINISHED'

