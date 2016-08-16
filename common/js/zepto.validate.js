var validate = {
        require: function(obj,ignore){
            ignore = ignore?ignore:{};
            errmsg = {
                userName:'请输入用户名',
                phone:'请输入手机号码',
                email:'请输入绑定邮箱',
                province:'请选择所在地区',
                password:'请设置密码',
                hospital:'请输入单位',
                office:'请输入科室',
                oldpassword:'请输入原密码',
                newpassword:'请输入新密码'
            }
            var _tag = true;
            for(var name in obj){
                if($.trim(obj[name]) == '' && errmsg[name] && ignore[name] !== 'ignore'){
                    $.dialog({
                        content : errmsg[name],
                        title:'alert',
                        time : 2000
                    });
                   _tag = false;
                   return false;
                }
            }
            return _tag;
        },
        phone: function(elem){
            var  _value = $.trim($(elem).val());
            if(!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(_value)){
                $.dialog({
                    content : '请输入正确的手机号码',
                    title:'alert',
                    time : 2000
                });
                return false;
            }else{
                return true;
            }
        },
        email: function(elem, errmsg){
            var _value = $.trim($(elem).val());
            if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(_value)){
                $.dialog({
                    content : '请输入正确的邮箱！',
                    title:'alert',
                    time : 2000
                });
                return false;
            }else{
                return true;
            }
        },
        compare: function(elem1, elem2){
            _value1 = $.trim($(elem1).val());
            _value2 = $.trim($(elem2).val());
            if(_value1 !== _value2){
                $.dialog({
                    content : '两次输入的密码不一致！',
                    title:'alert',
                    time : 2000
                });
                return false;
            }else{
                return true;
            }
        },
        ischeck:function(elem){
            var _ischeck = $(elem).is(':checked');
            if(!_ischeck){
                $.dialog({
                    content : '请同意注册协议！',
                    title:'alert',
                    time : 2000
                });
                return false;
            }else{
                return true;
            }
        },
        checkcode:function(elem,code){
            var _wcode = $.trim($(elem).val());
            if(_wcode !== code){
                $.dialog({
                    content : '验证码不正确！',
                    title:'alert',
                    time : 2000
                });
                 return false;
            }else{
                return true;
            }
        },
    };
