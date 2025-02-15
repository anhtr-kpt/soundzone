import thumb1 from "@/assets/thumb1.jpeg";
import { songsData } from "../components/SongsList";
import { Link } from "react-router-dom";
import { Calendar, Eye, Heart, MicVocal } from "lucide-react";
import splitLyrics from "@/utils/splitLyrics";

const lyrics = `Có những khúc hát mãi dở dang Có những khúc hát chưa thành câu Có
    những nỗi tiếc chìm trong quên lãng Có những nỗi nhớ để anh chỉ biết
    mong chờ Chẳng biết cớ sao em lặng im rời xa Lấp lánh tô thêm môi em
    hồng Long lanh sương mai như chờ mong Là anh người đã hái sao trên
    trời vì em Là anh đã hứa sẽ mãi có nhau trọn đời Là anh đã đành buông
    tay Nguyện ước mai này Mình cùng chung bước mai này Cùng bên nhau đến
    mai này Dù bao năm tháng ta mãi mãi chẳng đổi thay Chỉ còn anh với vô
    tận Chìm trong bóng tối ngày ấy Vì sao anh hái hôm nào Chẳng thể soi
    sáng hết bóng tối trong lòng anh Lấp lánh tô thêm môi em hồng Long
    lanh sương mai như chờ mong Là anh người đã hái sao trên trời chỉ vì
    em Là anh đã hứa sẽ mãi có nhau trọn đời Là anh đã đành buông tay
    Nguyện ước mai này Mình cùng chung bước mai này Cùng bên nhau đến mai
    này Dù bao năm tháng sẽ mãi mãi chẳng đổi thay Chỉ còn anh với vô tận
    Chìm trong bóng tối cô đơn Vì sao anh hái hôm nào Chẳng thể soi sáng
    hết bóng tối trong lòng anh Nguyện ước mai này Mình cùng chung bước
    mai này Cùng bên nhau đến mai này Dù bao năm tháng ta mãi mãi chẳng
    đổi thay Chỉ còn anh với vô tận Chìm trong bóng tối ngày ấy Vì sao anh
    hái cho em Chẳng thể soi sáng hết bóng tối trong lòng anh Mãi vì em`;

const SongDetail = () => {
  return (
    <div className="space-y-10">
      <section className="flex gap-8">
        <div>
          <img src={thumb1} className="size-80 rounded-xl" />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          <div>
            <p className="capitalize font-bold text-[26px]">
              {songsData[0].title}
            </p>
            <p className="text-[18px] font-semibold mt-1">
              {songsData[0].artists.map((artist) => (
                <Link
                  key={artist}
                  to={`/admin/artists/${artist._id}`}
                  className="primary-hover"
                >
                  {artist}
                </Link>
              ))}
            </p>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="">Composer</p>
                <p className="text-base font-semibold">
                  {songsData[0].composers.map((composer, index) => (
                    <span key={composer} className="">
                      {composer}
                      {index < songsData[0].composers.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="">Genres</p>
                <p className="text-base font-semibold">
                  {songsData[0].genres.map((genre, index) => (
                    <span key={genre} className="">
                      {genre}
                      {index < songsData[0].genres.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <p className="text-base">
            “Hãy trao cho anh” là ca khúc đánh dấu sự trở lại đầy bất ngờ sau
            gần một năm vắng bóng khi có sự xuất hiện của rapper nổi tiếng thế
            giới Snoop Dogg. Ngay khi MV chính thức…
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Calendar strokeWidth={1.5} size={20} />
              <span>Jul. 1, 2019</span>
            </div>
            <div className="flex gap-2 items-center">
              <Heart strokeWidth={1.5} size={20} />
              <span>86.7K</span>
            </div>
            <div className="flex gap-2 items-center">
              <Eye strokeWidth={1.5} size={20} />
              <span>86.7K views</span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="capitalize font-semibold flex gap-2">
          <MicVocal strokeWidth={1.5} size={20} />
          <span>{songsData[0].title} lyrics</span>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: splitLyrics(lyrics) }}
          className="text-base"
        />
        <div></div>
      </section>
    </div>
  );
};

export default SongDetail;
