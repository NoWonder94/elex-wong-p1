step=1
for(( i = 0; i < 60; i=(i+step)));do
    curl http://managetest.bolepays.com/callback/order/addressNotifys
    sleep $step
done
exit 0