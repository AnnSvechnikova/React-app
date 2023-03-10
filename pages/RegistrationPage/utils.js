export const validateRegistrationForm = (values)=> {
    const errors= {
        username: undefined,
        password: undefined,
        full_name: undefined,
    };

    if (!values.username) {
        errors.username = 'Пожалуйста, укажите имя пользователя';
    }

    if (!values.password) {
        errors.password = 'Пожалуйста, укажите пароль';
    }

    if (!values.full_name) {
        errors.email = 'Пожалуйста, укажите ваши имя и фамилию';
    }

    return errors;
};