const fs = require('fs');
const path = require('path');

const morphingPath = path.join(__dirname, 'src/components/library/logins/MorphingLoginForm.tsx');
let morphingCode = fs.readFileSync(morphingPath, 'utf8');
morphingCode = morphingCode.replace(
    'const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");',
    `const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");`
);
morphingCode = morphingCode.replace(
    'setTimeout(() => {\n            setStatus("success");\n        }, 1500);\n\n        setTimeout(() => {\n            setStatus("idle");\n        }, 4000);',
    `setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setStatus("success");
            } else {
                setStatus("failure");
                setTimeout(() => setStatus("idle"), 2000);
            }
        }, 1500);`
);
morphingCode = morphingCode.replace(
    'type="email"\n                                            required',
    'type="email"\n                                            required\n                                            value={email}\n                                            onChange={e => setEmail(e.target.value)}'
);
morphingCode = morphingCode.replace(
    'type="password"\n                                            required',
    'type="password"\n                                            required\n                                            value={password}\n                                            onChange={e => setPassword(e.target.value)}'
);
morphingCode = morphingCode.replace(
    'status === "submitting" ? { top: 340, bottom: 32, left: "30%", right: "30%", borderRadius: 24 }\n                            : { top: 0, bottom: 0, left: 0, right: 0, borderRadius: 0 }',
    'status === "submitting" ? { top: 340, bottom: 32, left: "30%", right: "30%", borderRadius: 24, backgroundColor: "var(--primary)" }\n                            : status === "failure" ? { top: 340, bottom: 32, left: 32, right: 32, borderRadius: 8, backgroundColor: "#ef4444" }\n                            : { top: 0, bottom: 0, left: 0, right: 0, borderRadius: 0, backgroundColor: "var(--primary)" }'
);
morphingCode = morphingCode.replace(
    '{status === "idle" && (',
    `{status === "failure" && (
                                <motion.span 
                                    key="failure" 
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }} 
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute text-white"
                                >
                                    Access Denied
                                </motion.span>
                            )}
                            {status === "idle" && (`
);
fs.writeFileSync(morphingPath, morphingCode);


const liquidPath = path.join(__dirname, 'src/components/library/logins/LiquidGooeyLogin.tsx');
let liquidCode = fs.readFileSync(liquidPath, 'utf8');
liquidCode = liquidCode.replace(
    'const [step, setStep] = useState<"idle" | "loading" | "success">("idle");',
    `const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [step, setStep] = useState<"idle" | "loading" | "success" | "failure">("idle");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");`
);
liquidCode = liquidCode.replace(
    'setTimeout(() => {\n            setStep("success");\n        }, 3000);\n        setTimeout(() => {\n            setStep("idle");\n        }, 6000);',
    `setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setStep("success");
                setTimeout(() => setStep("idle"), 3000);
            } else {
                setStep("failure");
                setTimeout(() => setStep("idle"), 2000);
            }
        }, 2000);`
);
liquidCode = liquidCode.replace(
    'type="email" \n                                    required ',
    'type="email" \n                                    required \n                                    value={email}\n                                    onChange={e => setEmail(e.target.value)}'
);
liquidCode = liquidCode.replace(
    'type="password" \n                                    required ',
    'type="password" \n                                    required \n                                    value={password}\n                                    onChange={e => setPassword(e.target.value)}'
);
liquidCode = liquidCode.replace(
    'step === "loading" ? { width: 0, height: 0, borderRadius: 100 }\n                        : { width: 140, height: 140, borderRadius: 100 }',
    'step === "loading" ? { width: 0, height: 0, borderRadius: 100 }\n                        : step === "failure" ? { width: 340, height: 360, borderRadius: 40, backgroundColor: "#ef4444" }\n                        : { width: 140, height: 140, borderRadius: 100 }'
);
fs.writeFileSync(liquidPath, liquidCode);


const terminalPath = path.join(__dirname, 'src/components/library/logins/TerminalLineLogin.tsx');
let terminalCode = fs.readFileSync(terminalPath, 'utf8');
terminalCode = terminalCode.replace(
    'const [step, setStep] = useState<"email" | "password" | "decrypting" | "granted">("email");',
    `const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [step, setStep] = useState<"email" | "password" | "decrypting" | "granted" | "denied">("email");`
);
terminalCode = terminalCode.replace(
    'setStep("granted");',
    `if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                            setStep("granted");
                        } else {
                            setStep("denied");
                            setTimeout(() => {
                                setEmail("");
                                setPassword("");
                                setStep("email");
                            }, 2000);
                        }`
);
terminalCode = terminalCode.replace(
    '{step === "granted" && (',
    `{step === "denied" && (
                        <motion.div key="denied" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center justify-center h-[300px]">
                            <div className="text-red-500 font-bold text-4xl mb-6 tracking-widest uppercase animate-pulse">Access Denied</div>
                            <p className="text-red-500/50 uppercase tracking-[0.2em] text-xs">Security breach detected.</p>
                        </motion.div>
                    )}
                    {step === "granted" && (`
);
fs.writeFileSync(terminalPath, terminalCode);

console.log("Updated 3 files successfully.");
