<!DOCTYPE html>
<html lang="en">
    <body>
        <tbody>
            <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:14px;vertical-align:top">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:20px;color:#15212a;font-weight:bold;line-height:25px;margin:0;margin-bottom:15px">
                        Hey there,
                    </p>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;color:#3a464c;font-weight:normal;margin:0;line-height:25px;margin-bottom:32px">
                        Welcome back! Use this code to securely sign in to your Bit555.io account:
                    </p>
                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;box-sizing:border-box">
                        <tbody>
                            <tr>
                                <td align="left" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;vertical-align:top;padding-bottom:35px">
                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:auto">
                                        <tbody>
                                            <tr>
                                                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;vertical-align:top;background-color:#000000;border-radius:5px;text-align:center">
                                                    <a style="display:inline-block;color:#ffffff;background-color:#000000;border:solid 1px #000000;border-radius:5px;box-sizing:border-box;text-decoration:none;font-size:16px;font-weight:normal;margin:0;padding:9px 22px 10px;border-color:#000000" >
                                                        {{ $code }}
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;color:#3a464c;font-weight:normal;line-height:25px;margin:0;margin-bottom:25px">
                        For your security, the code will expire in 10 minutes time.
                    </p>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;color:#3a464c;font-weight:normal;line-height:25px;margin:0;margin-bottom:30px">
                        See you soon!
                    </p>
                    <hr>
                </td>
            </tr>
            <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:14px;vertical-align:top;padding-top:80px">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:18px;font-size:11px;color:#738a94;font-weight:normal;margin:0;margin-bottom:2px">
                        If you did not make this request, you can safely ignore this email.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:14px;vertical-align:top;padding-top:2px">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:18px;font-size:11px;color:#738a94;font-weight:normal;margin:0;margin-bottom:2px">
                        This message was sent from
                        <a href="https://blog.bit555.com/" style="text-decoration:underline;color:#738a94;font-size:11px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://blog.bit555.com/&amp;source=gmail&amp;ust=1654418344847000&amp;usg=AOvVaw0FNKZX-KCKI0fwuOlMC_ZW">
                            blog.bit555.com
                        </a>
                        to
                        <a href="mailto:{{ $email }}" style="text-decoration:underline;color:#738a94;font-size:11px" target="_blank">
                            {{ $email }}
                        </a>
                    </p>
                </td>
            </tr>
        </tbody>
    </body>
</html>