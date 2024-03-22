import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {ActionIcon, Badge, Button, createTheme, Input, MantineProvider, Textarea} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from "./styles/basic-components.module.scss";
import {DateTimePicker, TimeInput} from "@mantine/dates";

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
        })
    },
    headings: {
        fontWeight: "600",
        sizes: {
            h1: {fontSize: '27px'},
            h3: {fontSize: '17px', fontWeight: '400'}
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </MantineProvider>,
)
