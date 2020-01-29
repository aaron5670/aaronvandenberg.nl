import React from 'react'
import {URL, PORT} from '../../../../../config';
import {Form, withFormik, FastField, ErrorMessage} from 'formik'
import Recaptcha from 'react-google-recaptcha'
import * as Yup from 'yup'
import {Button, Input} from 'components/common'
import {recaptcha_key} from 'data/config'
import {Error, Center, InputField} from './styles'

const ContactForm = ({
                         setFieldValue,
                         isSubmitting,
                         values,
                         errors,
                         touched,
                     }) => {

    const submitForm = async (event) => {
        event.preventDefault();
        if (values.name && values.email && values.message && !errors.message && !errors.email && !errors.recaptcha) {
            const url = `${URL}:${PORT}/contact/send`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                setFieldValue('success', true);
                setFieldValue('name', '');
                setFieldValue('email', '');
                setFieldValue('message', '');
                errors.message = '';
                errors.email = '';
                touched.name = false;
                touched.email = false;
                touched.message = false;
            } else {
                errors.message = 'Something went wrong, please try again!'
            }
        }
    };

    return (
        <Form
            name="portfolio-dev"
            method="post"
            onSubmit={submitForm}
        >
            <InputField>
                <Input
                    as={FastField}
                    type="text"
                    name="name"
                    component="input"
                    aria-label="name"
                    placeholder="Full name*"
                    error={touched.name && errors.name}
                />
                <ErrorMessage component={Error} name="name"/>
            </InputField>
            <InputField>
                <Input
                    id="email"
                    aria-label="email"
                    component="input"
                    as={FastField}
                    type="email"
                    name="email"
                    placeholder="Email*"
                    error={touched.email && errors.email}
                />
                <ErrorMessage component={Error} name="email"/>
            </InputField>
            <InputField>
                <Input
                    as={FastField}
                    component="textarea"
                    aria-label="message"
                    id="message"
                    rows="8"
                    type="text"
                    name="message"
                    placeholder="Message*"
                    error={touched.message && errors.message}
                />
                <ErrorMessage component={Error} name="message"/>
            </InputField>
            {values.name && values.email && values.message && (
                <InputField>
                    <FastField
                        component={Recaptcha}
                        sitekey={recaptcha_key}
                        name="recaptcha"
                        onChange={value => setFieldValue('recaptcha', value)}
                    />
                    <ErrorMessage component={Error} name="recaptcha"/>
                </InputField>
            )}
            {values.success && (
                <InputField>
                    <Center>
                        <h4>
                            Your message has been successfully sent, I will get back to you
                            ASAP!
                        </h4>
                    </Center>
                </InputField>
            )}
            <Center>
                <Button secondary type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </Center>
        </Form>
    )
};

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        message: '',
        recaptcha: '',
        success: false,
    }),
    validationSchema: () =>
        Yup.object().shape({
            name: Yup.string().required('Full name field is required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Email field is required'),
            message: Yup.string().required('Message field is required'),
            recaptcha: Yup.string().required('Robots are not welcome yet!'),
        }),
    handleSubmit: async (
        {name, email, message, recaptcha},
        {setSubmitting, resetForm, setFieldValue}
    ) => {
        try {
            const encode = data => {
                return Object.keys(data)
                    .map(
                        key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                    )
                    .join('&')
            };
            await fetch('/?no-cache=1', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: encode({
                    'form-name': 'portfolio-dev',
                    name,
                    email,
                    message,
                    'g-recaptcha-response': recaptcha,
                }),
            });
            await setSubmitting(false)
            await setFieldValue('success', true)
            setTimeout(() => resetForm(), 2000)
        } catch (err) {
            setSubmitting(false);
            setFieldValue('success', false);
            alert('Something went wrong, please try again!') // eslint-disable-line
        }
    },
})(ContactForm)
