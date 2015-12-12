setlocal
set id = %1
set host = %2
set url=https://%2/vsostatus/%1
echo %url%

curl -H "Content-Type: application/json" -X PUT -d "{ ""status"":""success"" }" %url%

endlocal