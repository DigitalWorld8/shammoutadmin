

const NewsletterFormWithCaptcha = () => {

    return (
        <div>
            <form
                className="flex w-full items-stretch gap-2 text-[10px] leading-none mt-[33px]"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-neutral-100 text-[rgba(30,57,94,1)] px-4 py-2 rounded-md w-full"

                />
                <button
                    type="button"
                    className="bg-[rgba(204,31,65,1)] text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>
            </form>



        </div>
    );
};

export default NewsletterFormWithCaptcha;
