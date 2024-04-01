import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {
    ActionIcon,
    AppShell,
    Badge,
    Button,
    createTheme,
    Input,
    MantineProvider, Notification,
    Textarea
} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import classes from "./styles/basic-components.module.scss";
import {DateTimePicker, TimeInput} from "@mantine/dates";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store";
import {api} from "./store/api/api.ts";
import {Notifications} from "@mantine/notifications";

export const theme = createTheme({
    fontFamily: 'Ubuntu, sans-serif',
    components: {
        Input: Input.extend({
            defaultProps: {
                size: 'xl'
            },
            classNames: {
                input: classes.input
            },
        }),
        Button: Button.extend({
            defaultProps: {
                size: 'xl',
                color: 'red'
            },
            classNames: {
                root: classes.button,
            }
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                radius: 'xl'
            }
        }),
        Badge: Badge.extend({
            defaultProps: {
                size: 'xl'
            },
            classNames: {
                root: classes.badge
            }
        }),
        Textarea: Textarea.extend({
            defaultProps: {
                rows: 6,
            },
            classNames: {
                input: classes.textarea
            }
        }),
        DateTimePicker: DateTimePicker.extend({
            defaultProps: {
              size: 'md'
            },
            classNames: {
                input: classes.dateInput,
                timeInput: classes.timeInput,
                wrapper: classes.dateTimeInputWrapper,
                error: classes.dateTimeError
            }
        }),
        TimeInput: TimeInput.extend({
            classNames: {
                label: classes.inputLabel
            }
        }),
        AppShell: AppShell.extend({
            classNames: {
                navbar: classes.navbar
            }
        }),
        Notification: Notification.extend({
            classNames: {
                root: classes.notification,
            }
        })
    },
    headings: {
        fontWeight: "600",
        sizes: {
            h1: {fontSize: '27px', fontWeight: '400'},
            h3: {fontSize: '17px', fontWeight: '400'}
        }
    },
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={theme}>
            <Notifications/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </Provider>,
)
