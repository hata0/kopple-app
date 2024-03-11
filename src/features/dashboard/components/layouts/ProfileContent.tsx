import { ProfileContent as Props } from "../../types/ProfileContent";

export const ProfileContent = ({
  address,
  age,
  birthday,
  hashtag,
  imageUrl,
  last,
  message,
  name,
  sex,
}: Props) => {
  return (
    <div>
      <div className="m-[10px] rounded-tl-[30px] rounded-tr-[30px] bg-[rgb(255,_242,_230)] pb-px">
        <header className="relative flex h-[100px] rounded-tl-[30px] rounded-tr-[30px] bg-[rgb(255,_229,_200)]">
          <div className="float-left mx-[15px] my-[auto]">
            <img className="h-[80px]" src={imageUrl} />
          </div>
          <div className="float-left mb-[15px] mt-auto text-[40px]">{name}</div>
          <div className="absolute -top-[30px] right-[20px] my-[0] ml-[auto] mr-[0]">
            <img className="h-[70px]" src="/portrait/arrow.png" />
          </div>
        </header>

        <div className="relative m-[20px] mt-[1em] rounded-[5px] border-[1.5px] border-solid border-[rgb(131,99,64)] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
          <h3 className="absolute -top-[1em] left-[0] right-[0] ml-[0.8em] mt-[5px]">
            <span className="inline-block rounded-[5px] bg-[#744a36] px-[.5em] py-[0] text-[#fff6f6]">
              プロフィール
            </span>
          </h3>
          <div className="px-[1.5em] pb-[.5em] pt-[1.2em]">
            <p className="m-0">
              {age}・{sex}
            </p>
            <p className="m-0">誕生日:{birthday}</p>
            <p className="m-0">住所:{address}</p>
          </div>
        </div>

        <div className="relative m-[20px] mt-[1em] rounded-[5px] border-[1.5px] border-solid border-[rgb(131,99,64)] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
          <h3 className="absolute -top-[1em] left-[0] right-[0] ml-[0.8em] mt-[5px]">
            <span className="inline-block rounded-[5px] bg-[#744a36] px-[.5em] py-[0] text-[#fff6f6]">
              メッセージ
            </span>
          </h3>
          <div className="px-[1.5em] pb-[.5em] pt-[1.2em]">{message}</div>
        </div>

        <div className=" relative  m-[20px]">
          <h3 className="my-[5px] ml-[5px] mr-[0]">
            <span className="">ハッシュタグ</span>
          </h3>
          <div className="py-[0] pl-[20px] pr-[0.5em] font-bold text-[#1877f2]">#{hashtag}</div>
        </div>

        <div className="relative m-[20px] mt-[1em] rounded-[5px] border-[1.5px] border-solid border-[rgb(131,99,64)] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
          <h3 className="absolute -top-[1em] left-[0] right-[0] ml-[0.8em] mt-[5px]">
            <span className="inline-block rounded-[5px] bg-[#744a36] px-[.5em] py-[0] text-[#fff6f6]">
              最後に
            </span>
          </h3>
          <div className="px-[1.5em] pb-[.5em] pt-[1.2em]">{last}</div>
        </div>
      </div>
    </div>
  );
};
// <div className="m-[10px] bg-[rgb(255,_242,_230)] rounded-tl-[30px] rounded-tr-[30px] pb-px">
//   <header className="bg-[rgb(255,_229,_200)] rounded-tl-[30px] rounded-tr-[30px] flex h-[100px] relative">
//     <div className="float-left mx-[15px] my-[auto]">
//       <img className="h-[80px]" src={imageUrl}/>
//     </div>
//     <div className="float-left text-[40px] mt-auto mb-[15px]">{name}</div>
//     <div className="ml-[auto] mr-[0] my-[0] absolute -top-[30px] right-[20px]">
//         <img className="h-[70px]" src="/public/portrait/arrow.png"/>
//     </div>
//   </header>

//   <div className="border-[1.5px] border-solid border-[rgb(131,99,64)] rounded-[5px] relative mt-[1em] m-[20px] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
//     <h3 className="absolute right-[0] left-[0] -top-[1em] ml-[0.8em] mt-[5px]">
//       <span className="px-[.5em] py-[0] bg-[#744a36] text-[#fff6f6] inline-block rounded-[5px]">プロフィール</span>
//     </h3>
//     <div className="pt-[1.2em] px-[1.5em] pb-[.5em]">
//       <p className="m-0">{age}・sex</p>
//       <p className="m-0">誕生日:birthday</p>
//       <p className="m-0">住所:address</p>
//     </div>
//   </div>

//   <div className="border-[1.5px] border-solid border-[rgb(131,99,64)] rounded-[5px] relative mt-[1em] m-[20px] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
//     <h3 className="absolute right-[0] left-[0] -top-[1em] ml-[0.8em] mt-[5px]">
//       <span className="px-[.5em] py-[0] bg-[#744a36] text-[#fff6f6] inline-block rounded-[5px]">メッセージ</span>
//     </h3>
//     <div className="pt-[1.2em] px-[1.5em] pb-[.5em]">{message}</div>
//   </div>

//   <div className=" m-[20px] before:[border-top:2px_solid_#0094D6] before:[border-left:2px_solid_#0094D6] after:[border-bottom:2px_solid_#0094D6] after:[border-right:2px_solid_#0094D6] after:right-[0] after:bottom-[0] after:content-[] after:w-[2em] after:h-[2em] after:absolute before:content-[] before:w-[2em] before:h-[2em] before:absolute relative">
//     <h3 className="ml-[5px] mr-[0] my-[5px]">
//       <span className="">ハッシュタグ</span>
//     </h3>
//     <div className="pl-[20px] pr-[0.5em] py-[0] text-[#1877f2] font-bold">#{hashtag}</div>
//   </div>

//   <div className="border-[1.5px] border-solid border-[rgb(131,99,64)] rounded-[5px] relative mt-[1em] m-[20px] bg-[rgb(255,_229,_200)] [box-shadow:5px_5px_3px_rgba(247,_214,_182,_0.45)]">
//     <h3 className="absolute right-[0] left-[0] -top-[1em] ml-[0.8em] mt-[5px]">
//       <span className="px-[.5em] py-[0] bg-[#744a36] text-[#fff6f6] inline-block rounded-[5px]">最後に</span>
//     </h3>
//     <div className="pt-[1.2em] px-[1.5em] pb-[.5em]">last</div>
//   </div>
// </div>
