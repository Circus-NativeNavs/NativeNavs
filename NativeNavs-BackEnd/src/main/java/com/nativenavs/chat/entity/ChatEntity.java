package com.nativenavs.chat.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chats")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ChatEntity {

    @Id
    private ObjectId id;

    private int roomId;

    private int senderId;
    private String senderNickname;
    private String senderProfileImage;
    private String content;
    private boolean isRead;
    private LocalDateTime sendTime;

    @Builder
    public ChatEntity(int roomId, int senderId, String senderNickname, String senderProfileImage, String content, boolean isRead, LocalDateTime sendTime) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderProfileImage = senderProfileImage;
        this.content = content;
        this.isRead = isRead;
        this.sendTime = LocalDateTime.now();
    }

    public static ChatEntity createChat(int roomId, int senderId, String senderNickname, String senderProfileImage, String content, boolean isRead, LocalDateTime sendTime) {
        return ChatEntity.builder()
                .roomId(roomId)
                .senderId(senderId)
                .senderNickname(senderNickname)
                .senderProfileImage(senderProfileImage)
                .content(content)
                .isRead(isRead)
                .sendTime(sendTime)
                .build();
    }
}