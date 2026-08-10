// =================================================================
// THƯ VIỆN NỘI DUNG & PROMPT ENGINEERING
// =================================================================

// 1. POPUP GIỚI THIỆU CÁC TRẢI BÀI
const SPREAD_DESCRIPTIONS = {
    "intent_all": "<strong>💌 Trải bài Toàn Diện 💌</strong><br><em>3 lá Tarot + 2 lá Lenormand</em><br>5 lá bài tương ứng trả lời nhanh 5 câu hỏi: Chuyện gì đang xảy ra, ở đâu, như thế nào, thời điểm nào, ai đến, ai đi, ai chịu tác động trực tiếp?.",
    "intent_what": "<strong>💌 Trải bài WHAT / YES-NO 💌</strong><br><em>Random nhanh 1 lá Tarot</em><br>Trả lời nhanh cho câu hỏi có, hoặc không, hoặc chưa xác định, và vì sao?",
    "intent_why": "<strong>💌 Trải bài WHY / HOW 💌</strong><br><em>Sử dụng 3 lá Tarot thời gian</em><br>Quả ở hiện tại bắt đầu từ nhân gieo ở quá khứ, quả ở tương lai gặt được chính là cái bạn gieo trồng hiện tại.",
    "intent_when": "<strong>💌 Trải bài WHEN / WHO 💌</strong><br><em>Sử dụng 3 lá Lenormand sự kiện</em><br>Tiên tri về sự kiện, khi nào, ai đến, ai đi, ai tác động, ai chịu tác động?.",
    "intent_mbs": "<strong>💖 Trải bài M.B.S (Tâm linh - Tâm lý - Đời thực) 💖</strong><br><em>Sử dụng 1 Chakra Oracle + 1 Tarot + 1 Lenormand</em><br>Sự kết hợp hoàn hảo để theo dõi năng lượng tiềm thức (Chakra), biến chuyển tâm trí (Tarot) và sự kiện vật lý ngoài đời thực (Lenormand).",
    "intent_healing": "<strong>💖 Trải bài Chữa Lành Điểm Nghẽn 💖</strong><br><em>Sử dụng 1 Chakra Oracle + 1 Tarot + 2 lá Lenormand</em><br>Phơi bày vết thương năng lượng trên luân xa, giải mã nguyên nhân sâu xa và chỉ ra hành động thực tế cần làm ngay để khơi thông.",
    "intent_relationship": "<strong>💖 Trải bài Gương Soi Nhân Duyên 💖</strong><br><em>Sử dụng 2 Tarot + 2 Lenormand + 1 Chakra Oracle</em><br>Soi chiếu tâm lý của bạn và đối phương, dự báo sự kiện thực tế sắp tới và rút ra bài học nghiệp quả chung giữa hai người.",
    "intent_dream": "<strong>🔮 Trải bài Giải Mã Tiềm Thức 🔮</strong><br><em>Sử dụng 1 Chakra Oracle + 1 Tarot + 1 Lenormand</em><br>Kết nối các tín hiệu cảnh báo từ giấc mơ hoặc Higher Self nhằm tìm ra dấu hiệu nhận biết thực tế ngoài đời thực.",
    "intent_mirror": "<strong>🔮 Trải bài Tấm Gương Bản Ngã 🔮</strong><br><em>Sử dụng 5 lá Tarot</em><br>Khai phóng cái tôi sâu bên trong, so sánh góc nhìn cá nhân với vị thế thực tế và hình ảnh của bạn dưới mắt nhìn công chúng.",
    "intent_crossroads": "<strong>🔮 Trải bài Ngã Rẽ Cuộc Đời 🔮</strong><br><em>Sử dụng 3 lá Tarot</em><br>Phân tích và đặt lên bàn cân so sánh giữa hai lựa chọn Hướng A và Hướng B, đi kèm lời khuyên tổng quan từ vũ trụ.",
    "intent_flow": "<strong>🔮 Trải bài Dòng Chảy Sự Kiện 🔮</strong><br><em>Sử dụng 5 lá Lenormand</em><br>Xâu chuỗi tuyến tính 5 giai đoạn liên tục để kể lại một câu chuyện thực tế rõ ràng từ quá khứ xa đến kết quả cuối cùng trong tương lai.",
    "classic_croix": "<strong>⚜️ Trải bài Chữ Thập Cổ Điển ⚜️</strong><br><em>Sử dụng 5 lá Tarot - Sắp xếp hình chữ thập</em><br>Biện chứng sâu sắc hai mặt Thuận lợi (Pour) - Trở ngại (Contre), kết hợp trạng thái Hiện tại để mở ra Kết quả và lá bài Đại cục ở trung tâm.",
    "classic_ligne": "<strong>⚜️ Trải bài Thẳng Hàng Cổ Điển ⚜️</strong><br><em>Sử dụng 3 lá Tarot hàng ngang</em><br>Theo dõi tiến trình vận động, logic nhân quả từ khởi điểm đến thực tại và điểm đến tương lai.",
    "classic_grand_ourse": "<strong>⚜️ Trải bài Đại Hùng Tinh Cổ Điển ⚜️</strong><br><em>Sử dụng 7 lá Tarot</em><br>Mô phỏng hình học 7 ngôi sao Bắc Đẩu để bóc tách 7 góc khuất chiến lược xung quanh gốc rễ, điểm mù và biến chuyển bất ngờ.",
    "classic_astrologique": "<strong>⚜️ Trải bài Thiên Văn Học Cổ Điển ⚜️</strong><br><em>Sử dụng 12 lá Tarot</em><br>Trải rộng toàn diện qua 12 Cung Nhà của Hệ thống Chiêm tinh, cung cấp cái nhìn đa chiều xung quanh tất cả các khía cạnh cuộc sống.",
    "classic_celtique": "<strong>⚜️ Trải bài Celtic Cross Cổ Điển ⚜️</strong><br><em>Sử dụng 10 lá Tarot - Sắp xếp Thập tự & Cột dọc</em><br>Cấu trúc huyền thoại phổ biến nhất của trải bài cổ điển. Dùng trong phân tích toàn diện vòng tròn cốt lõi (tiềm thức, quá khứ, tương lai gần) và trục đứng ngoại cảnh tác động.",
    "mystic_tree": "<strong>🌳 Tree of Life Spread (Hệ Thần học Kabbalah) 🌳</strong><br><em>Sử dụng 10 lá Tarot</em><br>Dựa trên Cây Sự Sống vĩ đại, trải bài này vạch trần toàn bộ dòng chảy năng lượng từ tầng nhận thức thần thánh, qua trí tuệ lý tính, xuống đến thế giới vật lý thực tại.",
    "mystic_shadow": "<strong>🌑 Shadow Work (Hệ Tâm lý học Jungian) 🌑</strong><br><em>Sử dụng 5 lá Tarot</em><br>Khám phá những góc tối bị kìm nén, tổn thương gốc rễ nằm sâu trong vô thức và hướng dẫn cách để bạn chấp nhận, tích hợp bóng tối vào bản ngã ánh sáng.",
    "mystic_johari": "<strong>😈 Blind Spot (Cửa sổ Johari - 4 vùng lăng kính) 😈</strong><br><em>Sử dụng 4 lá Tarot</em><br>Phơi bày 4 lăng kính nhận thức: Điều ai cũng thấy (Vùng Mở), Điều người khác thấy nhưng bạn không hay biết (Vùng Mù), Điều bạn giấu kín (Vùng Ẩn) và Tiềm thức sâu thẳm (Vùng Đóng).",
    "mystic_karmic": "<strong>♾️ Duyên Nợ Tiền Kiếp (Karmic Connections) ♾️</strong><br><em>Sử dụng 5 lá Tarot</em><br>Hé lộ các khế ước linh hồn, nợ nghiệp tiền kiếp, nguyên nhân sâu xa của những vòng lặp liên tục ở hiện tại và bài học linh hồn bạn cần tốt nghiệp."
};

// 2. CHÂN DUNG 3 READER / MENTOR
const READER_PERSONAS = {
    "amelia": {
        displayName: "🌸 <b>READER AMELIA (Thấu Cảm & Chữa Lành):</b>",
        title: "🌸 Reader Amelia",
        styleDesc: "ấm áp, thấu cảm, xoa dịu cảm xúc",
        prompt: `
        BẠN LÀ READER AMELIA:
        - Phong cách: Bạn là một Reader thiên về tâm lý học và chữa lành cảm xúc. Giọng văn ấm áp, dịu dàng, thấu cảm như một người bạn tri kỷ.
        - Trọng tâm luận giải: Thế giới cảm xúc, các mối quan hệ, nỗi sợ thầm kín và cách buông bỏ/chữa lành tổn thương.
        - Yêu cầu: Xoa dịu người xem, dùng ngôn từ mềm mại, lãng mạn nhưng thực tế. Nối các lá bài thành dòng chảy cảm xúc liền mạch.
        - Bố cục 3 phần trình bày:
          1. 🌌 **Năng lượng cảm xúc chủ đạo:** Bản chất tình huống dưới góc nhìn của tâm hồn & tổn thương.
          2. 🔮 **Câu chuyện tâm lý & mối quan hệ:** Diễn biến cảm xúc và sự thật bên trong các bên liên quan.
          3. ✨ **Lời khuyên chữa lành & Thời gian (Timing):** Hướng buông bỏ/hành động mềm mỏng và nhịp độ sự kiện.
        `
    },
    "michael": {
        displayName: "🧙‍♂️ <b>READER MICHAEL (Huyền Học & Chuyên Sâu):</b>",
        title: "🧙‍♂️ Reader Michael",
        styleDesc: "sắc sảo, lý trí, phân tích sâu góc độ huyền học/chiến lược",
        prompt: `
        BẠN LÀ READER MICHAEL:
        - Phong cách: Bạn là một nhà nghiên cứu Huyền học, Chiêm tinh và Chiến lược gia. Giọng văn điềm tĩnh, sắc sảo, khách quan và trí tuệ.
        - Trọng tâm luận giải: Bóc tách sâu cấu trúc lá bài, điểm mù lý trí, quy luật nhân quả và giải pháp chiến lược thực tế.
        - Yêu cầu: Phân tích thẳng thắn, không nói nước đôi, đưa ra hướng đi chiến lược mang tính ứng dụng cao.
        - Bố cục 3 phần trình bày:
          1. 🌌 **Bản chất đại cục & Thực trạng:** Phân tích cấu trúc sự việc dưới lăng kính quy luật thực tế.
          2. 🔮 **Phân tích điểm mù & Logic nhân quả:** Nguyên nhân gốc rễ, cạm bẫy lý trí và xu hướng phát triển.
          3. ✨ **Chiến lược hành động & Thời gian (Timing):** Giải pháp hành động rõ ràng và mốc thời gian cụ thể.
        `
    },
    "joey": {
        displayName: "📚 <b>MENTOR JOEY (Học & Giải Mã Chiêm Tinh - Tarot):</b>",
        title: "📚 Mentor Joey",
        styleDesc: "mang tính giảng dạy, giải thích rõ chiêm tinh học, cung nhà, ý nghĩa xuôi/ngược và cách liên kết bài",
        prompt: `
        BẠN LÀ MENTOR JOEY (TAROT & ASTROLOGY EDUCATOR):
        - Phong cách: Bạn là một người thầy, một mentor nhiệt huyết, thông thái và tràn đầy năng lượng. Bạn không chỉ trả lời câu hỏi mà đang DẠY người xem cách hiểu ngôn ngữ của bài Tarot và Lenormand.
        - Trọng tâm giảng dạy:
          + Chỉ rõ mối liên hệ Chiêm tinh học (Hành tinh chủ quản, Cung Hoàng Đạo, tương ứng Cung Nhà 1-12 trong bản đồ sao).
          + Phân tích cơ chế Xuôi / Ngược (tại sao lá ngược ở vị trí này lại tạo ra sự ách tắc hoặc bộc lộ Shadow).
          + Nghệ thuật liên kết bài (Card Synthesis): Cách nguyên tố/con số của lá này tương tác, bổ trợ hoặc xung khắc với lá kia.
          + Mở rộng sự kiện: Từ biểu tượng huyền học, hãy chỉ ra cách nó "hình dung hóa" thành sự kiện/hành động vật lý thực tế ở đời thực.
        - Yêu cầu: Viết sinh động, mạch lạc, giúp người đọc vừa có câu trả lời vừa "học" được cách đọc bài.
        - Bố cục 3 phần trình bày chuyên biệt của Joey:
          1. 🪐 **Bản Đồ Chiêm Tinh & Nguyên Tố:** Tóm tắt cấu trúc chiêm tinh, cung hoàng đạo và nguyên tố chủ đạo của tụ bài ảnh hưởng thế nào đến câu hỏi.
          2. 🔍 **Giải Phẫu Lá Bài & Nghệ Thuật Liên Kết:** Đi sâu vào từng lá bài (xuôi/ngược), cách chúng móc nối với nhau và ý nghĩa các Cung Nhà liên quan.
          3. 📖 **Mở Rộng Sự Kiện & Bài Học Ứng Dụng:** Dịch chuyển ý nghĩa biểu tượng thành sự kiện thực tế sắp xảy ra ở đời thực và mốc thời gian (Timing).
        `
    }
};

// 3. HÀM CHUYỂN HOÁ CẤU TRÚC TRẢI BÀI (SPREAD CONTEXT BUILDER)
function getSpreadContext(spreadMode, drawnCardsList) {
    const getReversedStr = (card) => (card.type === 'tarot' && card.reversed) ? " (ngược)" : "";

    if (spreadMode === "intent_what") {
        return `- Trải bài WHAT / YES-NO: ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}.
        -> Hãy đưa ra nhận định Yes, No hoặc Có điều kiện cụ thể, giải thích rõ lý do căn cứ theo năng lượng của lá bài.`;
    } else if (spreadMode === "intent_why") {
        return `- Quá khứ gần: ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        - Hiện tại: ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Tương lai gần: ${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}.
        -> Phân tích logic nhân quả: nhân gieo từ quá khứ, biến chuyển ở hiện tại và hướng đi sắp hiển lộ ở tương lai.`;
    } else if (spreadMode === "intent_when") {
        return `- Chuỗi 3 lá Lenormand sự kiện: ${drawnCardsList[0].name}, ${drawnCardsList[1].name}, ${drawnCardsList[2].name}.
        -> Xâu chuỗi 3 lá thành một diễn biến sự kiện liền mạch (coi lá ở giữa là trọng tâm). Đưa ra dự báo rõ ràng về mốc thời gian (Timing) và nhịp độ sự kiện.`;
    } else if (spreadMode === "intent_all") {
        return `- WHAT (Bản chất sự việc): ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        - WHY (Nguyên nhân/Gốc rễ): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - HOW (Hướng hành động): ${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}
        - WHEN (Dự báo nhịp độ/Thời gian - Lenormand): ${drawnCardsList[3].name}
        - WHO (Đối tượng/Nhân vật tác động - Lenormand): ${drawnCardsList[4].name}.
        -> Kết hợp hài hòa giữa chiều sâu nội tâm của Tarot và các chi tiết sự kiện vật lý thực tế của Lenormand thành một bức tranh toàn diện.`;
    } else if (spreadMode === "intent_mbs") {
        return `- Spirit (Năng lượng tiềm thức - Chakra Oracle): ${drawnCardsList[0].name}
        - Mind (Tâm trí/Bài học - Tarot): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Body (Sự kiện thực tế đời thực - Lenormand): ${drawnCardsList[2].name}.
        -> Xâu chuỗi cách rung động từ Luân Xa tiềm thức dẫn đến thái độ tâm trí, và biểu hiện ra thực tế cuộc sống qua lá Lenormand ra sao.`;
    } else if (spreadMode === "intent_healing") {
        return `- Vết thương/Góc khuất (Chakra Oracle): ${drawnCardsList[0].name}
        - Nguyên nhân kìm hãm (Tarot): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Giải pháp thực tế 1 (Lenormand): ${drawnCardsList[2].name}
        - Giải pháp thực tế 2 (Lenormand): ${drawnCardsList[3].name}.
        -> Phơi bày tổn thương năng lượng trên luân xa và chỉ ra hành động thiết thực cần làm ngay ở đời thực (kết hợp 2 lá Lenormand) để khơi thông điểm nghẽn.`;
    } else if (spreadMode === "intent_crossroads") {
        return `- Lựa chọn A (Kết quả): ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        - Lựa chọn B (Kết quả): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Lời khuyên tổng quan từ vũ trụ: ${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}.
        -> So sánh ưu nhược điểm thực tế của 2 ngã rẽ và hướng dẫn lựa chọn khôn ngoan nhất.`;
    } else if (spreadMode === "intent_flow") {
        return `- Tuyến tính 5 lá Lenormand: ${drawnCardsList[0].name} -> ${drawnCardsList[1].name} -> ${drawnCardsList[2].name} -> ${drawnCardsList[3].name} -> ${drawnCardsList[4].name}.
        -> Kể lại câu chuyện diễn biến sự kiện rõ ràng từ quá khứ đến kết quả cuối cùng theo thứ tự các lá bài.`;
    } else if (spreadMode === "intent_relationship") {
        return `- Tâm lý của bạn (Tarot): ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        - Tâm lý của đối phương (Tarot): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Sự kiện thực tế sắp diễn ra (Lenormand): ${drawnCardsList[2].name} & ${drawnCardsList[3].name}
        - Bài học tâm linh/nhân duyên (Chakra Oracle): ${drawnCardsList[4].name}.
        -> Soi chiếu tâm lý hai bên, dự báo biến chuyển sự kiện đời thực và bài học chung giữa hai linh hồn.`;
    } else if (spreadMode === "intent_dream") {
        return `- Điểm nghẽn tiềm thức (Chakra): ${drawnCardsList[0].name}
        - Thông điệp Higher Self muốn nhắn nhủ (Tarot): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Dấu hiệu/Manh mối ở đời thực cần lưu tâm (Lenormand): ${drawnCardsList[2].name}.`;
    } else if (spreadMode === "intent_mirror") {
        return `- Bản ngã sâu bên trong: ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        - Bạn tự nhận thức bản thân: ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        - Vị thế thực tế hiện tại: ${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}
        - Bạn trong mắt người khác: ${drawnCardsList[3].name}${getReversedStr(drawnCardsList[3])}
        - Sự thật cốt lõi & Lời khuyên: ${drawnCardsList[4].name}${getReversedStr(drawnCardsList[4])}.
        -> Phân tích sự đối chiếu giữa cách tự nhìn nhận, vị thế thực tế và hình ảnh trong mắt công chúng.`;
    } else if (spreadMode === "classic_croix") {
        return `- Trải bài Chữ Thập Cổ Điển Pháp (5 lá Tarot):
        Lá 1 (Pour - Thế mạnh/Thuận lợi): ${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}
        Lá 2 (Contre - Trở ngại/Thách thức): ${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}
        Lá 3 (État - Hiện trạng đỉnh điểm): ${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}
        Lá 4 (Résultats - Diễn tiến tiếp theo): ${drawnCardsList[3].name}${getReversedStr(drawnCardsList[3])}
        Lá 5 (Synthèse - Kết luận đại cục): ${drawnCardsList[4].name}${getReversedStr(drawnCardsList[4])}.
        -> Biện chứng hai mặt Thuận lợi - Trở ngại xoay quanh hoàn cảnh hiện tại, mở ra lời khuyên tổng hòa từ lá bài trung tâm.`;
    } else if (spreadMode === "classic_ligne") {
        return `- Chuỗi 3 lá Tarot Thẳng Hàng: Khởi điểm (${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}) -> Nút thắt hành động (${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}) -> Điểm đến tương lai (${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}).`;
    } else if (spreadMode === "classic_grand_ourse") {
        return `- Trải bài Đại Hùng Tinh (7 lá Tarot): Gốc rễ (${drawnCardsList[0].name}${getReversedStr(drawnCardsList[0])}), Điểm mù (${drawnCardsList[1].name}${getReversedStr(drawnCardsList[1])}), Lực cản/Hỗ trợ (${drawnCardsList[2].name}${getReversedStr(drawnCardsList[2])}), Vũ khí giải pháp (${drawnCardsList[3].name}${getReversedStr(drawnCardsList[3])}), Biến chuyển ngắn hạn (${drawnCardsList[4].name}${getReversedStr(drawnCardsList[4])}), Yếu tố bất ngờ (${drawnCardsList[5].name}${getReversedStr(drawnCardsList[5])}), Chung cuộc dài hạn (${drawnCardsList[6].name}${getReversedStr(drawnCardsList[6])}).`;
    } else if (spreadMode === "classic_astrologique") {
        return `- Trải bài 12 Cung Nhà Chiêm Tinh (12 lá Tarot từ Nhà 1 đến Nhà 12): 
        1.Cái tôi (${drawnCardsList[0].name}), 2.Tài chính (${drawnCardsList[1].name}), 3.Giao tiếp (${drawnCardsList[2].name}), 4.Gia đạo (${drawnCardsList[3].name}), 5.Niềm vui/Lãng mạn (${drawnCardsList[4].name}), 6.Thường nhật/Sức khỏe (${drawnCardsList[5].name}), 7.Đối tác/Song phương (${drawnCardsList[6].name}), 8.Chuyển hóa/Tiền chung (${drawnCardsList[7].name}), 9.Định hướng xa (${drawnCardsList[8].name}), 10.Sự nghiệp (${drawnCardsList[9].name}), 11.Mạng lưới/Bạn bè (${drawnCardsList[10].name}), 12.Góc tối/Tiềm thức (${drawnCardsList[11].name}).
        -> Tổng hợp cái nhìn chiêm tinh toàn diện quanh mọi khía cạnh cuộc sống của người xem.`;
    } else if (spreadMode === "classic_celtique") {
        return `- Celtic Cross Cổ Điển (10 lá Tarot): Hiện tại (${drawnCardsList[0].name}), Thách thức (${drawnCardsList[1].name}), Ý thức cao nhất (${drawnCardsList[2].name}), Nền tảng tiềm thức (${drawnCardsList[3].name}), Quá khứ vừa qua (${drawnCardsList[4].name}), Tương lai cận kề (${drawnCardsList[5].name}), Vị thế cá nhân (${drawnCardsList[6].name}), Môi trường tác động (${drawnCardsList[7].name}), Hy vọng/Nỗi sợ (${drawnCardsList[8].name}), Kết luận chung cuộc (${drawnCardsList[9].name}).`;
    } else if (spreadMode === "mystic_tree") {
        return `- Tree of Life Kabbalah (10 lá Tarot theo 10 Sephiroth): Kether (${drawnCardsList[0].name}), Chokhmah (${drawnCardsList[1].name}), Binah (${drawnCardsList[2].name}), Chesed (${drawnCardsList[3].name}), Gevurah (${drawnCardsList[4].name}), Tiferet (${drawnCardsList[5].name}), Netzach (${drawnCardsList[6].name}), Hod (${drawnCardsList[7].name}), Yesod (${drawnCardsList[8].name}), Malkuth (${drawnCardsList[9].name}).
        -> Phân tích dòng chảy năng lượng từ tầng thần thánh xuống biểu hiện ở thế giới vật lý Malkuth.`;
    } else if (spreadMode === "mystic_shadow") {
        return `- Shadow Work Jungian (5 lá Tarot): Mặt nạ xã hội (${drawnCardsList[0].name}), Bóng tối chối bỏ (${drawnCardsList[1].name}), Tổn thương gốc rễ (${drawnCardsList[2].name}), Bài học bóng tối (${drawnCardsList[3].name}), Hành trình tích hợp (${drawnCardsList[4].name}).
        -> Xoa dịu và hướng dẫn cách dung hòa vùng tối vào bản ngã ánh sáng một cách lành mạnh.`;
    } else if (spreadMode === "mystic_johari") {
        return `- Cửa sổ Johari (4 lá Tarot): Vùng Mở (${drawnCardsList[0].name}), Vùng Mù (${drawnCardsList[1].name}), Vùng Ẩn (${drawnCardsList[2].name}), Vùng Đóng (${drawnCardsList[3].name}).`;
    } else if (spreadMode === "mystic_karmic") {
        return `- Duyên Nợ Tiền Kiếp (5 lá Tarot): Năng lượng tiền kiếp (${drawnCardsList[0].name}), Nợ nghiệp (${drawnCardsList[1].name}), Khế ước linh hồn (${drawnCardsList[2].name}), Bài học nhân quả (${drawnCardsList[3].name}), Hướng giải phóng (${drawnCardsList[4].name}).`;
    }
    return "";
}

// 4. HÀM TẠO PROMPT LUẬN GIẢI CHÍNH (MAIN READING PROMPT)
function buildMainReadingPrompt(selectedReader, question, spreadMode, drawnCardsList) {
    const readerInfo = READER_PERSONAS[selectedReader] || READER_PERSONAS["amelia"];
    const spreadContext = getSpreadContext(spreadMode, drawnCardsList);

    return `
    ${readerInfo.prompt}

    TƯ DUY NGẦM (KHÔNG VIẾT RẬP KHUÔN RA BÀI):
    - Tuyệt đối KHÔNG nhắc đến các từ khóa lập trình hay kỹ thuật như "pip inserts", "tỷ lệ %", "thiên thời địa lợi".
    - Xưng hô là "mình" (hoặc tự xưng theo đúng tên Reader) và "bạn".

    CẤU TRÚC TRẢI BÀI CỦA NGƯỜI DÙNG:
    - Câu hỏi: "${question}"
    - Các lá bài vừa lật:
    ${spreadContext}

    YÊU CẦU TRÌNH BÀY (TIẾNG VIỆT - GỌN GÀNG, ĐÚNG CHẤT VÀ BỐ CỤC CỦA READER ĐÃ CHỌN):
    Hãy trình bày đúng theo bố cục 3 phần chuyên biệt của nhân vật đã được giao ở trên. Viết cách dòng thoáng, rõ ý, in đậm các từ khóa quan trọng.
    `;
}

// 5. HÀM TẠO PROMPT HỎI ĐÁP TIẾP NỐI (FOLLOW-UP PROMPT)
function buildFollowupPrompt(selectedReader, currentSessionContext, userMsg) {
    const readerInfo = READER_PERSONAS[selectedReader] || READER_PERSONAS["amelia"];

    return `
    Bạn đang là ${readerInfo.title}, tiếp tục trò chuyện với người xem về chính tụ bài vừa bốc.
    ${currentSessionContext}
    
    Người xem vừa đặt CÂU HỎI TIẾP NỔI về tụ bài trên: "${userMsg}"
    
    Hãy trả lời ngắn gọn, thẳng vào câu hỏi phụ này dựa trên năng lượng của các lá bài đã bốc ở trên. Giữ đúng giọng điệu và phương pháp của ${readerInfo.title} (${readerInfo.styleDesc}). Không cần chào hỏi lại từ đầu, hãy trả lời súc tích, rõ ý và dễ hiểu.
    `;
}
