import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';
import { settingUser, setAuthenticated, setUsername, setRole } from "./redux/authSlice";
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Focus on the username input when the component mounts
        const inputElement = document.getElementById("username");
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidUser = USER_REGEX.test(user);
        const isValidPwd = PWD_REGEX.test(pwd);

        if (!isValidUser || !isValidPwd) {
            setErrMsg("Invalid Entry");
            setSuccess(false);
            return;
        }

        console.log(user, pwd);
        // setSuccess(true);
        //  navigate('superAdmin')
        const apiUrl = 'https://api.zues.ae/api/token';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user,
                    password: pwd,
                }),
            });

            console.log(response, "res")
            if (response.ok) {
                const userData = await response.json();
                console.log(userData.user.roles, "user");

                if (userData && userData.user.roles && userData.user.roles.includes('super_admin')) {
                    dispatch(settingUser(userData.user.name));
                    dispatch(setUsername(user));
                    dispatch(setAuthenticated(true));
                    dispatch(setRole('super_admin'));
                    //setSuccess(true)

                    navigate('/superAdmin');
                    setErrMsg('')
                }
                else if (userData && userData.user.roles && userData.user.roles.includes('store_owner')) {
                    console.log("yes", userData.user.roles.includes('store_owner'))
                    dispatch(settingUser(userData.user.name));
                    dispatch(setUsername(user));
                    dispatch(setAuthenticated(true));
                    dispatch(setAuthenticated(true));
                    dispatch(setRole('store_owner'));
                    //setSuccess(true)
                    setErrMsg('')
                    navigate('/storeOwner');
                }
                else {
                    setErrMsg('Invalid Role!');
                    setSuccess(false);
                }
            }
            else {
                // console.log("no user")
                setErrMsg('Invalid credentials');
                setSuccess(false);
            }
        }
        catch (err) {
            console.log(err, "Error during login, Try again!");
            setSuccess(false);
        }

    };

    return (
        <>
            <section>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="email"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p className={userFocus && user && !validName ? "instructions" : "offscreen"} id="uidnote">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Letters, numbers, underscores allowed.
                    </p>

                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"} id="pwdnote">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p className={matchFocus && !validMatch ? "instructions" : "offscreen"} id="confirmnote">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button disabled={!validName || !validPwd || !validMatch}>Sign Up</button>

                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/* put router link here */}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </form>
            </section>

        </>
    );
};

export default Login;
