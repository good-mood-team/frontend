/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { CommandInputContainer } from "./styled/CommandInput.styled";
import UserTag from "./UserTag";

const CommandInput = ({
    name,
    value,
    numValues,
    index,
    elIndex,
    regex,
    errorMsg,
    setState,
}) => {
    const re = new RegExp(regex);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (re.test(value.toString())) {
                if (index === numValues) {
                    setState((prevState) => ({
                        ...prevState,
                        index: prevState.index + 1,
                        finished: true,
                    }));
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        index: prevState.index + 1,
                    }));
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    [name]: "",
                }));

                alert(`Valeur invalide! ${errorMsg}`);
            }
        }
    };

    return (
        <CommandInputContainer>
            <UserTag />
            <input
                type="text"
                maxLength="10"
                value={value}
                onChange={(ev) =>
                    setState((prevState) => ({
                        ...prevState,
                        [name]: ev.target.value,
                    }))
                }
                spellCheck={false}
                autoComplete="false"
                onKeyDown={handleKeyDown}
                disabled={elIndex + 1 !== index}
                autoFocus={elIndex + 1 === index}
            />
        </CommandInputContainer>
    );
};

export default CommandInput;
